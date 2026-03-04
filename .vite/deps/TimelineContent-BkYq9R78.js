import { r as __toESM } from "./chunk-DUEDWNxO.js";
import { t as require_react } from "./react-Df7v5evG.js";
import { n as clsx_default } from "./clsx-BkYFeveK.js";
import { $ as generateUtilityClass, Dt as composeClasses, Ot as require_prop_types, bt as require_jsx_runtime, t as styled_default } from "./styled-CvD7q2Ek.js";
import { t as generateUtilityClasses } from "./generateUtilityClasses-JN_Zuvws.js";
import { f as useThemeProps } from "./styles-CMzj7hcf.js";
import { n as TimelineContext_default, t as convertTimelinePositionToClass } from "./convertTimelinePositionToClass-BJb2KRZm.js";
import { t as Typography_default } from "./Typography-BkzQyBAt.js";

//#region node_modules/@mui/lab/esm/TimelineContent/timelineContentClasses.js
function getTimelineContentUtilityClass(slot) {
	return generateUtilityClass("MuiTimelineContent", slot);
}
var timelineContentClasses = generateUtilityClasses("MuiTimelineContent", [
	"root",
	"positionLeft",
	"positionRight",
	"positionAlternate",
	"positionAlternateReverse"
]);
var timelineContentClasses_default = timelineContentClasses;

//#endregion
//#region node_modules/@mui/lab/esm/TimelineContent/TimelineContent.js
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_prop_types = /* @__PURE__ */ __toESM(require_prop_types(), 1);
var import_jsx_runtime = require_jsx_runtime();
var useUtilityClasses = (ownerState) => {
	const { position, classes } = ownerState;
	return composeClasses({ root: ["root", convertTimelinePositionToClass(position)] }, getTimelineContentUtilityClass, classes);
};
var TimelineContentRoot = styled_default(Typography_default, {
	name: "MuiTimelineContent",
	slot: "Root",
	overridesResolver: (props, styles) => {
		const { ownerState } = props;
		return [styles.root, styles[convertTimelinePositionToClass(ownerState.position)]];
	}
})(({ ownerState }) => ({
	flex: 1,
	padding: "6px 16px",
	textAlign: "left",
	...ownerState.position === "left" && { textAlign: "right" }
}));
var TimelineContent = /* @__PURE__ */ import_react.forwardRef(function TimelineContent$1(inProps, ref) {
	const props = useThemeProps({
		props: inProps,
		name: "MuiTimelineContent"
	});
	const { className, ...other } = props;
	const { position: positionContext } = import_react.useContext(TimelineContext_default);
	const ownerState = {
		...props,
		position: positionContext || "right"
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TimelineContentRoot, {
		component: "div",
		className: clsx_default(useUtilityClasses(ownerState).root, className),
		ownerState,
		ref,
		...other
	});
});
TimelineContent.propTypes = {
	children: import_prop_types.default.node,
	classes: import_prop_types.default.object,
	className: import_prop_types.default.string,
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
var TimelineContent_default = TimelineContent;

//#endregion
export { getTimelineContentUtilityClass as n, timelineContentClasses_default as r, TimelineContent_default as t };
//# sourceMappingURL=TimelineContent-BkYq9R78.js.map