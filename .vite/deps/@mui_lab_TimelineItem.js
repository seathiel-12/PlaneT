import { r as __toESM } from "./chunk-DUEDWNxO.js";
import { t as require_react } from "./react-Df7v5evG.js";
import { n as clsx_default } from "./clsx-BkYFeveK.js";
import { $ as generateUtilityClass, Dt as composeClasses, Ot as require_prop_types, bt as require_jsx_runtime, t as styled_default } from "./styled-CvD7q2Ek.js";
import "./extends-5nBDns8v.js";
import "./extendSxProp-BtlBi6nz.js";
import { t as generateUtilityClasses } from "./generateUtilityClasses-JN_Zuvws.js";
import { v as isMuiElement_default } from "./utils-C0KqTjXv.js";
import { f as useThemeProps } from "./styles-CMzj7hcf.js";
import { n as TimelineContext_default, t as convertTimelinePositionToClass } from "./convertTimelinePositionToClass-BJb2KRZm.js";
import "./memoTheme-BB6g--Nk.js";
import "./DefaultPropsProvider-eRCtRYaZ.js";
import "./useForkRef-B-BIqx4O.js";
import "./createSimplePaletteValueFilter-RIm_6coR.js";
import "./Typography-BkzQyBAt.js";
import { r as timelineContentClasses_default } from "./TimelineContent-BkYq9R78.js";
import { r as timelineOppositeContentClasses_default } from "./TimelineOppositeContent-D9bmPh50.js";

//#region node_modules/@mui/lab/esm/TimelineItem/timelineItemClasses.js
var import_prop_types = /* @__PURE__ */ __toESM(require_prop_types(), 1);
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
function getTimelineItemUtilityClass(slot) {
	return generateUtilityClass("MuiTimelineItem", slot);
}
var timelineItemClasses = generateUtilityClasses("MuiTimelineItem", [
	"root",
	"positionLeft",
	"positionRight",
	"positionAlternate",
	"positionAlternateReverse",
	"missingOppositeContent"
]);
var timelineItemClasses_default = timelineItemClasses;

//#endregion
//#region node_modules/@mui/lab/esm/TimelineItem/TimelineItem.js
var import_jsx_runtime = require_jsx_runtime();
var useUtilityClasses = (ownerState) => {
	const { position, classes, hasOppositeContent } = ownerState;
	return composeClasses({ root: [
		"root",
		convertTimelinePositionToClass(position),
		!hasOppositeContent && "missingOppositeContent"
	] }, getTimelineItemUtilityClass, classes);
};
var TimelineItemRoot = styled_default("li", {
	name: "MuiTimelineItem",
	slot: "Root",
	overridesResolver: (props, styles) => {
		const { ownerState } = props;
		return [styles.root, styles[convertTimelinePositionToClass(ownerState.position)]];
	}
})(({ ownerState }) => ({
	listStyle: "none",
	display: "flex",
	position: "relative",
	minHeight: 70,
	...ownerState.position === "left" && { flexDirection: "row-reverse" },
	...(ownerState.position === "alternate" || ownerState.position === "alternate-reverse") && { [`&:nth-of-type(${ownerState.position === "alternate" ? "even" : "odd"})`]: {
		flexDirection: "row-reverse",
		[`& .${timelineContentClasses_default.root}`]: { textAlign: "right" },
		[`& .${timelineOppositeContentClasses_default.root}`]: { textAlign: "left" }
	} },
	...!ownerState.hasOppositeContent && { "&::before": {
		content: "\"\"",
		flex: 1,
		padding: "6px 16px"
	} }
}));
var TimelineItem = /* @__PURE__ */ import_react.forwardRef(function TimelineItem$1(inProps, ref) {
	const props = useThemeProps({
		props: inProps,
		name: "MuiTimelineItem"
	});
	const { position: positionProp, className, ...other } = props;
	const { position: positionContext } = import_react.useContext(TimelineContext_default);
	let hasOppositeContent = false;
	import_react.Children.forEach(props.children, (child) => {
		if (isMuiElement_default(child, ["TimelineOppositeContent"])) hasOppositeContent = true;
	});
	const ownerState = {
		...props,
		position: positionProp || positionContext || "right",
		hasOppositeContent
	};
	const classes = useUtilityClasses(ownerState);
	const contextValue = import_react.useMemo(() => ({ position: ownerState.position }), [ownerState.position]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TimelineContext_default.Provider, {
		value: contextValue,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TimelineItemRoot, {
			className: clsx_default(classes.root, className),
			ownerState,
			ref,
			...other
		})
	});
});
TimelineItem.propTypes = {
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
var TimelineItem_default = TimelineItem;

//#endregion
export { TimelineItem_default as default, getTimelineItemUtilityClass, timelineItemClasses_default as timelineItemClasses };
//# sourceMappingURL=@mui_lab_TimelineItem.js.map