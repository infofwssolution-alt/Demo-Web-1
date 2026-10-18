import { registerRoot, Composition } from "remotion";
import { ChatbotPromo } from "./ChatbotPromo";
import { Short1Chatting } from "./Short1Chatting";
import { Short2Navigation } from "./Short2Navigation";
import { Short3FormFill } from "./Short3FormFill";

export const RemotionRoot = () => {
  return (
    <>
      {/* 3 x 15-second 16:9 Landscape Short Videos (450 frames @ 30fps) matching real website & widget */}
      <Composition
        id="Short1-Chatting"
        component={Short1Chatting}
        durationInFrames={450}
        fps={30}
        width={1920}
        height={1080}
      />

      <Composition
        id="Short2-Navigation"
        component={Short2Navigation}
        durationInFrames={450}
        fps={30}
        width={1920}
        height={1080}
      />

      <Composition
        id="Short3-FormFill"
        component={Short3FormFill}
        durationInFrames={450}
        fps={30}
        width={1920}
        height={1080}
      />

      {/* Full 2:30 Master Landscape Presentation */}
      <Composition
        id="ChatbotPromo"
        component={ChatbotPromo}
        durationInFrames={4500}
        fps={30}
        width={1920}
        height={1080}
      />
    </>
  );
};

registerRoot(RemotionRoot);
