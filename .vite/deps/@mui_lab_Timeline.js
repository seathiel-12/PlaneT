import { r as __toESM } from "./chunk-DUEDWNxO.js";
import { t as require_react } from "./react-Df7v5evG.js";
import { n as clsx_default } from "./clsx-BkYFeveK.js";
import { $ as generateUtilityClass, Dt as composeClasses, Ot as require_prop_types, bt as require_jsx_runtime, t as styled_default } from "./styled-CvD7q2Ek.js";
import "./extends-5nBDns8v.js";
import "./extendSxProp-BtlBi6nz.js";
import { t as generateUtilityClasses } from "./generateUtilityClasses-JN_Zuvws.js";
import "./utils-C0KqTjXv.js";
import { f as useThemeProps } from "./styles-CMzj7hcf.js";
import { n as TimelineContext_default, t as convertTimelinePositionToClass } from "./convertTimelinePositionToClass-BJb2KRZm.js";
import "./memoTheme-BB6g--Nk.js";
import "./DefaultPropsProvider-eRCtRYaZ.js";
import "./useForkRef-B-BIqx4O.js";

//#region node_modules/@mui/lab/esm/Timeline/timelineClasses.js
var import_prop_types = /* @__PURE__ */ __toESM(require_prop_types(), 1);
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
function getTimelineUtilityClass(slot) {
	return generateUtilityClass("MuiTimeline", slot);
}
var timelineClasses = generateUtilityClasses("MuiTimeline", [
	"root",
	"positionLeft",
	"positionRight",
	"positionAlternate",
	"positionAlternateReverse"
]);
var timelineClasses_default = timelineClasses;

//#endregion
//#region node_modules/@mui/lab/esm/Timeline/Timeline.js
var import_jsx_runtime = require_jsx_runtime();
var useUtilityClasses = (ownerState) => {
	const { position, classes } = ownerState;
	return composeClasses({ root: ["root", position && convertTimelinePositionToClass(position)] }, getTimelineUtilityClass, classes);
};
var TimelineRoot = styled_default("ul", {
	name: "MuiTimeline",
	slot: "Root",
	overridesResolver: (props, styles) => {
		const { ownerState } = props;
		return [styles.root, ownerState.position && styles[convertTimelinePositionToClass(ownerState.position)]];
	}
})({
	display: "flex",
	flexDirection: "column",
	padding: "6px 16px",
	flexGrow: 1
});
/**
*
* Demos:
*
* - [Timeline](https://v7.mui.com/material-ui/react-timeline/)
*
* API:
*
* - [Timeline API](https://v7.mui.com/material-ui/api/timeline/)
*/
var Timeline = /* @__PURE__ */ import_react.forwardRef(function Timeline$1(inProps, ref) {
	const props = useThemeProps({
		props: inProps,
		name: "MuiTimeline"
	});
	const { position = "right", className, ...other } = props;
	const ownerState = {
		...props,
		position
	};
	const classes = useUtilityClasses(ownerState);
	const contextValue = import_react.useMemo(() => ({ position }), [position]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TimelineContext_default.Provider, {
		value: contextValue,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TimelineRoot, {
			className: clsx_default(classes.root, className),
			ownerState,
			ref,
			...other
		})
	});
});
Timeline.propTypes = {
	children: import_prop_types.default.node,
	classes: import_prop_types.default.object,
	className: import_prop_types.default.string,
	position: import_prop_types.default.oneOf([
		"alternate-reverse",
		"alternate",
		"left",
		"right"
	]),
	sx: import_prop_types.default.oneOfType([
		import_prop_types.default.arrayOf(import_prop_types.default.oneOfType([
			import_prop_types.default.func,
			import_prop_types.default.object,
			import_prop_types.default.bool
		])),
		import_prop_types.default.func,
		import_prop_types.default.object
	])
};
/**
*
* Demos:
*
* - [Timeline](https://mui.com/components/timeline/)
*
* API:
*
* - [Timeline API](https://mui.com/api/timeline/)
*/
var Timeline_default = Timeline;

//#endregion
export { Timeline_default as default, getTimelineUtilityClass, timelineClasses_default as timelineClasses };
//# sourceMappingURL=@mui_lab_Timeline.js.map