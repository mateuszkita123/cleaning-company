import React from "react";
import { useNavigate } from "react-router-dom";

import ActionIcon, { ActionIconProps } from "./ActionIcon";

interface ActionButtonProps {
  content: string,
  fontClassName?: string
}

type ComponentProps = ActionButtonProps & ActionIconProps;

const ActionButton: React.FC<ComponentProps> = ({ icon, path, content, className, fontClassName }) => {
  let navigate = useNavigate();

  return (
    <div className={`${className}`} onClick={() => navigate(path)}>
      <ActionIcon className={`${fontClassName}`} icon={icon} path={path} />
      {content}
    </div>)
};

export default ActionButton;