import Lottie from "react-lottie";
import animationData from "../animation/plane-animation.json";
import { animationConfig } from "@/config/animationConfig";
const config = animationConfig(animationData);
const ChatLoadingSkeleton = () => {
  return (
    <div className="flex flex-col px-4 gap-4">
      <Lottie options={config} height={400} width={400} />
    </div>
  );
};

export default ChatLoadingSkeleton;
