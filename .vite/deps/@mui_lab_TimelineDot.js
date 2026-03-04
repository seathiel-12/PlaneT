import { r as __toESM } from "./chunk-DUEDWNxO.js";
import { t as require_react } from "./react-Df7v5evG.js";
import { n as clsx_default } from "./clsx-BkYFeveK.js";
import { $ as generateUtilityClass, Dt as composeClasses, Ot as require_prop_types, bt as require_jsx_runtime, t as styled_default } from "./styled-CvD7q2Ek.js";
import "./extends-5nBDns8v.js";
import "./extendSxProp-BtlBi6nz.js";
import { t as generateUtilityClasses } from "./generateUtilityClasses-JN_Zuvws.js";
import "./utils-C0KqTjXv.js";
import { f as useThemeProps } from "./styles-CMzj7hcf.js";
import { n as capitalize_default } from "./memoTheme-BB6g--Nk.js";
import "./DefaultPropsProvider-eRCtRYaZ.js";
import "./useForkRef-B-BIqx4O.js";

//#region node_modules/@mui/lab/esm/TimelineDot/timelineDotClasses.js
var import_prop_types = /* @__PURE__ */ __toESM(require_prop_types(), 1);
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
function getTimelineDotUtilityClass(slot) {
	return generateUtilityClass("MuiTimelineDot", slot);
}
var timelineDotClasses = generateUtilityClasses("MuiTimelineDot", [
	"root",
	"filled",
	"outlined",
	"filledGrey",
	"outlinedGrey",
	"filledPrimary",
	"outlinedPrimary",
	"filledSecondary",
	"outlinedSecondary"
]);
var timelineDotClasses_default = timelineDotClasses;

//#endregion
//#region node_modules/@mui/lab/esm/TimelineDot/TimelineDot.js
var import_jsx_runtime = require_jsx_runtime();
var useUtilityClasses = (ownerState) => {
	const { color, variant, classes } = ownerState;
	return composeClasses({ root: [
		"root",
		variant,
		color !== "inherit" && `${variant}${capitalize_default(color)}`
	] }, getTimelineDotUtilityClass, classes);
};
var TimelineDotRoot = styled_default("span", {
	name: "MuiTimelineDot",
	slot: "Root",
	overridesResolver: (props, styles) => {
		const { ownerState } = props;
		return [
			styles.root,
			styles[ownerState.color !== "inherit" && `${ownerState.variant}${capitalize_default(ownerState.color)}`],
			styles[ownerState.variant]
		];
	}
})(({ ownerState, theme }) => ({
	display: "flex",
	alignSelf: "baseline",
	borderStyle: "solid",
	borderWidth: 2,
	padding: 4,
	borderRadius: "50%",
	boxShadow: (theme.vars || theme).shadows[1],
	margin: "11.5px 0",
	...ownerState.variant === "filled" && {
		borderColor: "transparent",
		...ownerState.color !== "inherit" && { ...ownerState.color === "grey" ? {
			color: (theme.vars || theme).palette.grey[50],
			backgroundColor: (theme.vars || theme).palette.grey[400]
		} : {
			color: (theme.vars || theme).palette[ownerState.color].contrastText,
			backgroundColor: (theme.vars || theme).palette[ownerState.color].main
		} }
	},
	...ownerState.variant === "outlined" && {
		boxShadow: "none",
		backgroundColor: "transparent",
		...ownerState.color !== "inherit" && { ...ownerState.color === "grey" ? { borderColor: (theme.vars || theme).palette.grey[400] } : { borderColor: (theme.vars || theme).palette[ownerState.color].main } }
	}
}));
var TimelineDot = /* @__PURE__ */ import_react.forwardRef(function TimelineDot$1(inProps, ref) {
	const props = useThemeProps({
		props: inProps,
		name: "MuiTimelineDot"
	});
	const { className, color = "grey", variant = "filled", ...other } = props;
	const ownerState = {
		...props,
		color,
		variant
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TimelineDotRoot, {
		className: clsx_default(useUtilityClasses(ownerState).root, className),
		ownerState,
		ref,
		...other
	});
});
TimelineDot.propTypes = {
	children: import_prop_types.default.node,
	classes: import_prop_types.default.object,
	className: import_prop_types.default.string,
	color: import_prop_types.default.oneOfType([import_prop_types.default.oneOf([
		"error",
		"grey",
		"info",
		"inherit",
		"primary",
		"secondary",
		"success",
		"warning"
	]), import_prop_types.default.string]),
	sx: import_prop_types.default.oneOfType([
		import_prop_types.default.arrayOf(import_prop_types.default.oneOfType([
			import_prop_types.default.func,
			import_prop_types.default.object,
			import_prop_types.default.bool
		])),
		import_prop_types.default.func,
		import_prop_types.default.object
	]),
	variant: import_prop_types.default.oneOfType([import_prop_types.default.oneOf(["filled", "outlined"]), import_prop_types.default.string])
};
var TimelineDot_default = TimelineDot;

//#endregion
export { TimelineDot_default as default, getTimelineDotUtilityClass, timelineDotClasses_default as timelineDotClasses };
//# sourceMappingURL=@mui_lab_TimelineDot.js.map