import { r as __toESM } from "./chunk-DUEDWNxO.js";
import { t as require_react } from "./react-Df7v5evG.js";
import { n as capitalize_default } from "./memoTheme-BB6g--Nk.js";

//#region node_modules/@mui/lab/esm/Timeline/TimelineContext.js
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
/**
* @ignore - internal component.
*/
var TimelineContext = /* @__PURE__ */ import_react.createContext({});
TimelineContext.displayName = "TimelineContext";
var TimelineContext_default = TimelineContext;

//#endregion
//#region node_modules/@mui/lab/esm/internal/convertTimelinePositionToClass.js
function convertTimelinePositionToClass(position) {
	return position === "alternate-reverse" ? "positionAlternateReverse" : `position${capitalize_default(position)}`;
}

//#endregion
export { TimelineContext_default as n, convertTimelinePositionToClass as t };
//# sourceMappingURL=convertTimelinePositionToClass-BJb2KRZm.js.map