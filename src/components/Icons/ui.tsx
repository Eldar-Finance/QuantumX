import { createIcon } from "@chakra-ui/react";

// using `path`
export const DotsIcon = createIcon({
  displayName: "UpDownIcon",
  viewBox: "0 0 21 6",
  // path can also be an array of elements, if you have multiple paths, lines, shapes, etc.
  path: (
    <svg>
      <circle cx="2.5" cy="3" r="2.5" fill="white" />
      <circle cx="10.5" cy="3" r="2.5" fill="white" />
      <circle cx="18.5" cy="3" r="2.5" fill="white" />
    </svg>
  ),
});
