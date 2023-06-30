import cv2

# Replace the URL with your RTSP stream
cap = cv2.VideoCapture('rtsp://192.168.2.23')

while True:
    ret, frame = cap.read()
    if not ret:
        break

    # Display the resulting frame
    cv2.imshow('Stream', frame)

    # Quit if 'q' is pressed
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

# After the loop release the cap object and destroy all windows
cap.release()
cv2.destroyAllWindows()
