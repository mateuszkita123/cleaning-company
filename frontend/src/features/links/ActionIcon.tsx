import React from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from '@fortawesome/fontawesome-svg-core';

export interface ActionIconProps {
  icon: IconProp,
  path: string,
  className?: string
}

// by default ActionIcon has mr-2 class to get initial right margin
const ActionIcon: React.FC<ActionIconProps> = ({ icon, path, className }) => {
  let navigate = useNavigate();

  return (
    <FontAwesomeIcon
      className={`mr-2 ${className}`}
      icon={icon}
      onClick={() => navigate(path)}
    />)
};

export default ActionIcon;