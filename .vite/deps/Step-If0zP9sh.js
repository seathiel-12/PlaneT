import { r as __toESM } from "./chunk-DUEDWNxO.js";
import { t as require_react } from "./react-Df7v5evG.js";
import { n as clsx_default } from "./clsx-BkYFeveK.js";
import { $ as generateUtilityClass, Dt as composeClasses, Ot as require_prop_types, bt as require_jsx_runtime, t as styled_default } from "./styled-CvD7q2Ek.js";
import { t as generateUtilityClasses } from "./generateUtilityClasses-JN_Zuvws.js";
import { t as useDefaultProps } from "./DefaultPropsProvider-eRCtRYaZ.js";
import { t as integerPropType_default } from "./integerPropType-BPFZdXQ3.js";
import { r as StepperContext_default, t as StepContext_default } from "./StepContext-aDFQw0Cz.js";

//#region node_modules/@mui/material/esm/Step/stepClasses.js
function getStepUtilityClass(slot) {
	return generateUtilityClass("MuiStep", slot);
}
var stepClasses = generateUtilityClasses("MuiStep", [
	"root",
	"horizontal",
	"vertical",
	"alternativeLabel",
	"completed"
]);
var stepClasses_default = stepClasses;

//#endregion
//#region node_modules/@mui/material/esm/Step/Step.js
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_prop_types = /* @__PURE__ */ __toESM(require_prop_types(), 1);
var import_jsx_runtime = require_jsx_runtime();
var useUtilityClasses = (ownerState) => {
	const { classes, orientation, alternativeLabel, completed } = ownerState;
	return composeClasses({ root: [
		"root",
		orientation,
		alternativeLabel && "alternativeLabel",
		completed && "completed"
	] }, getStepUtilityClass, classes);
};
var StepRoot = styled_default("div", {
	name: "MuiStep",
	slot: "Root",
	overridesResolver: (props, styles) => {
		const { ownerState } = props;
		return [
			styles.root,
			styles[ownerState.orientation],
			ownerState.alternativeLabel && styles.alternativeLabel,
			ownerState.completed && styles.completed
		];
	}
})({ variants: [{
	props: { orientation: "horizontal" },
	style: {
		paddingLeft: 8,
		paddingRight: 8
	}
}, {
	props: { alternativeLabel: true },
	style: {
		flex: 1,
		position: "relative"
	}
}] });
var Step = /* @__PURE__ */ import_react.forwardRef(function Step$1(inProps, ref) {
	const props = useDefaultProps({
		props: inProps,
		name: "MuiStep"
	});
	const { active: activeProp, children, className, component = "div", completed: completedProp, disabled: disabledProp, expanded = false, index, last, ...other } = props;
	const { activeStep, connector, alternativeLabel, orientation, nonLinear } = import_react.useContext(StepperContext_default);
	let [active = false, completed = false, disabled = false] = [
		activeProp,
		completedProp,
		disabledProp
	];
	if (activeStep === index) active = activeProp !== void 0 ? activeProp : true;
	else if (!nonLinear && activeStep > index) completed = completedProp !== void 0 ? completedProp : true;
	else if (!nonLinear && activeStep < index) disabled = disabledProp !== void 0 ? disabledProp : true;
	const contextValue = import_react.useMemo(() => ({
		index,
		last,
		expanded,
		icon: index + 1,
		active,
		completed,
		disabled
	}), [
		index,
		last,
		expanded,
		active,
		completed,
		disabled
	]);
	const ownerState = {
		...props,
		active,
		orientation,
		alternativeLabel,
		completed,
		disabled,
		expanded,
		component
	};
	const newChildren = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(StepRoot, {
		as: component,
		className: clsx_default(useUtilityClasses(ownerState).root, className),
		ref,
		ownerState,
		...other,
		children: [connector && alternativeLabel && index !== 0 ? connector : null, children]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StepContext_default.Provider, {
		value: contextValue,
		children: connector && !alternativeLabel && index !== 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_react.Fragment, { children: [connector, newChildren] }) : newChildren
	});
});
Step.propTypes = {
	active: import_prop_types.default.bool,
	children: import_prop_types.default.node,
	classes: import_prop_types.default.object,
	className: import_prop_types.default.string,
	completed: import_prop_types.default.bool,
	component: import_prop_types.default.elementType,
	disabled: import_prop_types.default.bool,
	expanded: import_prop_types.default.bool,
	index: integerPropType_default,
	last: import_prop_types.default.bool,
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
var Step_default = Step;

//#endregion
export { getStepUtilityClass as n, stepClasses_default as r, Step_default as t };
//# sourceMappingURL=Step-If0zP9sh.js.map