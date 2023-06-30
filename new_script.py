# http://192.168.2.43:5500/


import cv2
import numpy as np
import requests
import time



net = cv2.dnn.readNetFromCaffe('deploy.prototxt', 'mobilenet_iter_73000.caffemodel')


# Replace with your ESP32-CAM's stream URL
stream_url = "http://192.168.2.47:81/stream"
# stream_url = "rtmp://192.168.2.43/live/stream"

# Create a VideoCapture object
cap = cv2.VideoCapture(stream_url)

# Labels of MobileNet SSD trained on COCO dataset.
labels = ["background", "aeroplane", "bicycle", "bird", "boat", "bottle", "bus", "car", "cat", "chair", "cow",
          "diningtable", "dog", "horse", "motorbike", "person", "pottedplant", "sheep", "sofa", "train", "tvmonitor"]

last_detection_time = 0  # This variable will keep track of the last detection time
cooldown = 10  # Cooldown time in seconds

while(True):
    # Capture frame-by-frame
    ret, frame = cap.read()

    # If frame is read correctly ret is True
    if not ret:
        print("Can't receive frame (stream end?). Exiting ...")
        break

    # Resize frame to 300x300 pixels
    blob = cv2.dnn.blobFromImage(cv2.resize(frame, (300, 300)), 0.007843, (300, 300), 127.5)

    # Pass the blob through the network and obtain the detections and predictions
    net.setInput(blob)
    detections = net.forward()

    # loop over the detections
    for i in np.arange(0, detections.shape[2]):
        # extract the confidence (i.e., probability) associated with the prediction
        confidence = detections[0, 0, i, 2]

        # filter out weak detections by ensuring the `confidence` is greater than the minimum confidence
        if confidence > 0.8:
            # extract the index of the class label from the detections
            idx = int(detections[0, 0, i, 1])

            # send POST request
            if labels[idx] == 'person':
                # Only send a POST request if enough time has passed since the last one
                if time.time() - last_detection_time >= cooldown:
                    response = requests.post('http://localhost:3000/api/detection', json={'type': 'person'})
                    last_detection_time = time.time()
            
            # compute the (x, y)-coordinates of the bounding box for the object
            box = detections[0, 0, i, 3:7] * np.array([frame.shape[1], frame.shape[0], frame.shape[1], frame.shape[0]])
            (startX, startY, endX, endY) = box.astype("int")

            # Only draw the prediction on the frame if the label is "person"
            if labels[idx] == "person":
                label = "{}: {:.2f}%".format(labels[idx], confidence * 100)
                cv2.rectangle(frame, (startX, startY), (endX, endY), (0, 255, 0), 2)
                y = startY - 15 if startY - 15 > 15 else startY + 15
                cv2.putText(frame, label, (startX, y), cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 255, 0), 2)


    # Display the resulting frame
    cv2.imshow('ESP32-CAM Stream', frame)

    # Exit if ESC key is pressed
    if cv2.waitKey(1) == 27:
        break


# When everything is done, release the capture and close all windows
cap.release()
cv2.destroyAllWindows()


