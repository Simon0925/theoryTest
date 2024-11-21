import PencilSvg from "../../../SVG/PencilSvg/PencilSvg";
import ClockSvg from "../../../SVG/ClockSvg/ClockSvg";
import LightSvg from "../../../SVG/LightSvg/LightSvg";
import CameraSvg from "../../../SVG/CameraSvg/CameraSvg";
import SettingsSvg from "../../../SVG/SettingsSvg/SettingsSvg";

const NAV_ITEMS = [
  { path: "/", icon: PencilSvg, label: "Practice" },
  { path: "/mock-test", icon: ClockSvg, label: "Mock Test" },
  { path: "/trainer", icon: LightSvg, label: "Trainer" },
  { path: "/hpt", icon: CameraSvg, label: "HPT" },
  { path: "/settings", icon: SettingsSvg, label: "Settings" },
];




export { NAV_ITEMS };
