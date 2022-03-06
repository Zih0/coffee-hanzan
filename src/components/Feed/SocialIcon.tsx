import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

interface ISocialIconProps {
  href: string;
  icon: IconProp;
}

function SocialIcon({ href, icon }: ISocialIconProps) {
  return (
    <a href={href} target="_blank" rel="noreferrer">
      <FontAwesomeIcon icon={icon} />
    </a>
  );
}

export default SocialIcon;
