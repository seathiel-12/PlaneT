import { r as __toESM } from "./chunk-DUEDWNxO.js";
import { t as require_react } from "./react-Df7v5evG.js";
import { n as clsx_default } from "./clsx-BkYFeveK.js";
import { $ as generateUtilityClass, Dt as composeClasses, Ot as require_prop_types, bt as require_jsx_runtime, t as styled_default } from "./styled-CvD7q2Ek.js";
import { t as generateUtilityClasses } from "./generateUtilityClasses-JN_Zuvws.js";
import { f as useThemeProps } from "./styles-CMzj7hcf.js";
import { n as TimelineContext_default, t as convertTimelinePositionToClass } from "./convertTimelinePositionToClass-BJb2KRZm.js";
import { t as Typography_default } from "./Typography-BkzQyBAt.js";

//#region node_modules/@mui/lab/esm/TimelineOppositeContent/timelineOppositeContentClasses.js
function getTimelineOppositeContentUtilityClass(slot) {
	return generateUtilityClass("MuiTimelineOppositeContent", slot);
}
var timelineOppositeContentClasses = generateUtilityClasses("MuiTimelineOppositeContent", [
	"root",
	"positionLeft",
	"positionRight",
	"positionAlternate",
	"positionAlternateReverse"
]);
var timelineOppositeContentClasses_default = timelineOppositeContentClasses;

//#endregion
//#region node_modules/@mui/lab/esm/TimelineOppositeContent/TimelineOppositeContent.js
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_prop_types = /* @__PURE__ */ __toESM(require_prop_types(), 1);
var import_jsx_runtime = require_jsx_runtime();
var useUtilityClasses = (ownerState) => {
	const { position, classes } = ownerState;
	return composeClasses({ root: ["root", convertTimelinePositionToClass(position)] }, getTimelineOppositeContentUtilityClass, classes);
};
var TimelineOppositeContentRoot = styled_default(Typography_default, {
	name: "MuiTimelineOppositeContent",
	slot: "Root",
	overridesResolver: (props, styles) => {
		const { ownerState } = props;
		return [styles.root, styles[convertTimelinePositionToClass(ownerState.position)]];
	}
})(({ ownerState }) => ({
	padding: "6px 16px",
	marginRight: "auto",
	textAlign: "right",
	flex: 1,
	...ownerState.position === "left" && { textAlign: "left" }
}));
var TimelineOppositeContent = /* @__PURE__ */ import_react.forwardRef(function TimelineOppositeContent$1(inProps, ref) {
	const props = useThemeProps({
		props: inProps,
		name: "MuiTimelineOppositeContent"
	});
	const { className, ...other } = props;
	const { position: positionContext } = import_react.useContext(TimelineContext_default);
	const ownerState = {
		...props,
		position: positionContext || "left"
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TimelineOppositeContentRoot, {
		component: "div",
		className: clsx_default(useUtilityClasses(ownerState).root, className),
		ownerState,
		ref,
		...other
	});
});
TimelineOppositeContent.propTypes = {
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
TimelineOppositeContent.muiName = "TimelineOppositeContent";
var TimelineOppositeContent_default = TimelineOppositeContent;

//#endregion
export { getTimelineOppositeContentUtilityClass as n, timelineOppositeContentClasses_default as r, TimelineOppositeContent_default as t };
//# sourceMappingURL=TimelineOppositeContent-D9bmPh50.js.map