import PencilSvg from "../../../SVG/PencilSvg/PencilSvg";
import ClockSvg from "../../../SVG/ClockSvg/ClockSvg";
import LightSvg from "../../../SVG/LightSvg/LightSvg";
import CameraSvg from "../../../SVG/CameraSvg/CameraSvg";
import SettingsSvg from "../../../SVG/SettingsSvg/SettingsSvg";

const PATH_TO_ACTIVE_KEY: { [key: string]: string } = {
  "/": "practice",
  "/mock-test": "mockTest",
  "/trainer": "trainer",
  "/hpt": "hpt",
  "/settings": "settings",
};

const NAV_ITEMS = [
  { path: "/", icon: PencilSvg, label: "Practice" },
  { path: "/mock-test", icon: ClockSvg, label: "Mock Test" },
  { path: "/trainer", icon: LightSvg, label: "Trainer" },
  { path: "/hpt", icon: CameraSvg, label: "HPT" },
  { path: "/settings", icon: SettingsSvg, label: "Settings" },
];


const isActivePath = (path: string, currentPath: string): boolean => {
  const currentKey = PATH_TO_ACTIVE_KEY[currentPath];
  return currentKey === PATH_TO_ACTIVE_KEY[path];
};

export { PATH_TO_ACTIVE_KEY, NAV_ITEMS, isActivePath };
