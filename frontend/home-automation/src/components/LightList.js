"use client";
import { Switch } from "@/components/ui/switch";
import LightSlider from "@/components/ui/LightSlider";
import { useState, useEffect } from "react";
import axios from "axios";
import _ from "lodash";
import dynamic from "next/dynamic";
const Progress = dynamic(
  () => import("@/components/ui/progress").then((mod) => mod.Progress),
  {
    ssr: false,
  }
);
import { useToast } from "@/components/ui/use-toast";

export const mockedApiResponse = {
  rooms: [
    {
      roomId: "be2a7618-8439-458c-b26a-11da7fa3fac6",
      status: "off",
      roomName: "Porch",
      lights: [
        {
          label: "Outside Bulb 3",
          deviceId: "639f6782-5c83-414d-a138-8e1e6eae27cd",
          status: "off",
          brightness: 100,
        },
        {
          label: "Outside Bulb 2",
          deviceId: "5d5924f8-25b7-429e-8b64-7f20ca9775b2",
          status: "off",
          brightness: 100,
        },
        {
          label: "Outside Bulb 1",
          deviceId: "892e452d-c6b9-4481-80b0-0c6f8cc8d431",
          status: "off",
          brightness: 100,
        },
      ],
    },
    {
      roomId: "e37d24d7-d7ed-4519-90a3-c8c5c7cfc52f",
      status: "on",
      roomName: "Taiwo's Bedroom",
      lights: [
        {
          label: "Taiwo Bulb 2",
          deviceId: "cf417475-9840-4aeb-aba3-909baabe4020",
          status: "on",
          brightness: 100,
        },
        {
          label: "Taiwo Bulb 1",
          deviceId: "adc4a651-c31b-41f6-a930-d9dcd7224343",
          status: "on",
          brightness: 100,
        },
      ],
    },
    {
      roomId: "ecee47a4-feb2-4f3f-a0f3-8d0d1f70fe86",
      status: "on",
      roomName: "Kenny's Bedroom",
      lights: [
        {
          label: "Kenny Bulb 2",
          deviceId: "5546c520-3e20-4fe2-aa94-73d67bf0518c",
          status: "on",
          brightness: 100,
        },
        {
          label: "Kenny Bulb 1",
          deviceId: "cbbc0208-871e-45ee-be79-4778d2b07416",
          status: "on",
          brightness: 100,
        },
      ],
    },
  ],
};

// const fetchRoomData = () => Promise.resolve(mockedApiResponse);
const fetchRoomData = async () => {
  try {
    const response = await axios.get(
      "http://192.168.2.43:5000/api/v1/fetchDevices"
    );
    if (response.data && response.data.items) {
      return response.data.items;
    }
  } catch (error) {
    console.error(`Failed to fetch room data: ${error}`);
    throw error;
  }
};

const LightList = () => {
  const [rooms, setRooms] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const [updatingDevices, setUpdatingDevices] = useState([]);

  const { toast } = useToast();

  useEffect(() => {
    fetchRoomData()
      .then((data) => {
        setRooms(data);
        setIsLoading(false);
      })
      .catch((err) => {
        setErrorMessage("An error occurred");
        setIsLoading(false);
      });
  }, []);

  const updateLight = async (light, action, value) => {
    const newLight = { ...light };
    if (action === "brightness") {
      newLight.brightness = value;
    } else {
      newLight.status = value;
    }
    setUpdatingDevices((prevDevices) => [...prevDevices, light.deviceId]);

    try {
      await axios.post("http://192.168.2.43:5000/api/v1/lights", {
        action: newLight.status,
        device_id: light.deviceId,
        ...(action === "brightness" && { brightness_level: value }),
      });

      return newLight;
    } catch (error) {
      console.error(
        `Failed to update light status for device ${light.deviceId}: ${error}`
      );

      if (action === "brightness") {
        toast({
          description: `Failed to update brightness status.`,
          status: "error",
        });
      } else {
        toast({
          description: `Failed to update light status.`,
          status: "error",
        });
      }
      // Toast for failure

      return light; // revert to the old light if the API call failed
    } finally {
      setUpdatingDevices((prevDevices) =>
        prevDevices.filter((id) => id !== light.deviceId)
      );
    }
  };

  const handleBrightnessChange = async (roomId, brightness) => {
    const newRooms = [...rooms];
    const room = newRooms.find((r) => r.roomId === roomId);
    if (room) {
      const promises = room.lights.map((light, index) => {
        return updateLight(light, "brightness", brightness).then(
          (updatedLight) => {
            room.lights[index] = updatedLight;
          }
        );
      });
      Promise.all(promises).then(() => {
        setRooms(newRooms);
        // Toast for success
        toast({
          description: `The brightness has been successfully updated.`,
        });
      });
    }
  };

  const toggleSwitch = async (roomId) => {
    const newRooms = [...rooms];
    const room = newRooms.find((r) => r.roomId === roomId);
    if (room) {
      const newStatus = room.status === "on" ? "off" : "on";
      const promises = room.lights.map((light, index) => {
        return updateLight(light, "status", newStatus).then((updatedLight) => {
          room.lights[index] = updatedLight;
        });
      });
      Promise.all(promises).then(() => {
        room.status = newStatus;
        setRooms(newRooms);

        // Toast for success
        toast({
          description: `The lights have been successfully turned ${newStatus}.`,
        });
      });
    }
  };

  return (
    <>
      {isLoading ? (
        <div className="flex flex-col items-center justify-center w-1/2 h-full">
          <Progress value={85} />
          <div className="mt-4">Loading...</div>
        </div>
      ) : errorMessage ? (
        <div className="flex items-center justify-center w-full h-full">
          {errorMessage}
        </div>
      ) : (
        <div className="flex flex-col w-full h-fit">
          <div className="flex w-full h-10 p-2 items-center justify-between text-center">
            <div className="title font-bold w-1/3">ROOM</div>
            <div className="title font-bold w-1/3 ">STATUS</div>
            <div className="title font-bold w-1/3 ">BRIGHTNESS</div>
          </div>
          {rooms.map((room) => {
            const avgBrightness = Math.round(
              _.mean(room.lights.map((light) => light.brightness))
            );
            return (
              <div
                key={room.roomId}
                className="flex w-full h-10 py-2 md:p-2 items-center justify-between text-center mb-4 md:mb-2"
              >
                <div className="title w-1/3">{room.roomName}</div>
                <div className="title w-1/3">
                  <Switch
                    checked={room.status === "on"}
                    onCheckedChange={() => toggleSwitch(room.roomId)}
                    disabled={room.lights.some((light) =>
                      updatingDevices.includes(light.deviceId)
                    )}
                  />
                </div>
                <div className="slider w-1/3">
                  <LightSlider
                    initialBrightness={avgBrightness}
                    onBrightnessChange={(value) =>
                      handleBrightnessChange(room.roomId, value)
                    }
                  />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
};

export default LightList;
