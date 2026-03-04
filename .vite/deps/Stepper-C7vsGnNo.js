import { r as __toESM } from "./chunk-DUEDWNxO.js";
import { t as require_react } from "./react-Df7v5evG.js";
import { n as clsx_default } from "./clsx-BkYFeveK.js";
import { $ as generateUtilityClass, Dt as composeClasses, Ot as require_prop_types, bt as require_jsx_runtime, t as styled_default } from "./styled-CvD7q2Ek.js";
import { t as generateUtilityClasses } from "./generateUtilityClasses-JN_Zuvws.js";
import { n as capitalize_default, t as memoTheme_default } from "./memoTheme-BB6g--Nk.js";
import { t as useDefaultProps } from "./DefaultPropsProvider-eRCtRYaZ.js";
import { t as integerPropType_default } from "./integerPropType-BPFZdXQ3.js";
import { r as StepperContext_default, t as StepContext_default } from "./StepContext-aDFQw0Cz.js";

//#region node_modules/@mui/material/esm/StepConnector/stepConnectorClasses.js
function getStepConnectorUtilityClass(slot) {
	return generateUtilityClass("MuiStepConnector", slot);
}
var stepConnectorClasses = generateUtilityClasses("MuiStepConnector", [
	"root",
	"horizontal",
	"vertical",
	"alternativeLabel",
	"active",
	"completed",
	"disabled",
	"line",
	"lineHorizontal",
	"lineVertical"
]);
var stepConnectorClasses_default = stepConnectorClasses;

//#endregion
//#region node_modules/@mui/material/esm/StepConnector/StepConnector.js
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_prop_types$1 = /* @__PURE__ */ __toESM(require_prop_types(), 1);
var import_jsx_runtime = require_jsx_runtime();
var useUtilityClasses$1 = (ownerState) => {
	const { classes, orientation, alternativeLabel, active, completed, disabled } = ownerState;
	return composeClasses({
		root: [
			"root",
			orientation,
			alternativeLabel && "alternativeLabel",
			active && "active",
			completed && "completed",
			disabled && "disabled"
		],
		line: ["line", `line${capitalize_default(orientation)}`]
	}, getStepConnectorUtilityClass, classes);
};
var StepConnectorRoot = styled_default("div", {
	name: "MuiStepConnector",
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
})({
	flex: "1 1 auto",
	variants: [{
		props: { orientation: "vertical" },
		style: { marginLeft: 12 }
	}, {
		props: { alternativeLabel: true },
		style: {
			position: "absolute",
			top: 12,
			left: "calc(-50% + 20px)",
			right: "calc(50% + 20px)"
		}
	}]
});
var StepConnectorLine = styled_default("span", {
	name: "MuiStepConnector",
	slot: "Line",
	overridesResolver: (props, styles) => {
		const { ownerState } = props;
		return [styles.line, styles[`line${capitalize_default(ownerState.orientation)}`]];
	}
})(memoTheme_default(({ theme }) => {
	const borderColor = theme.palette.mode === "light" ? theme.palette.grey[400] : theme.palette.grey[600];
	return {
		display: "block",
		borderColor: theme.vars ? theme.vars.palette.StepConnector.border : borderColor,
		variants: [{
			props: { orientation: "horizontal" },
			style: {
				borderTopStyle: "solid",
				borderTopWidth: 1
			}
		}, {
			props: { orientation: "vertical" },
			style: {
				borderLeftStyle: "solid",
				borderLeftWidth: 1,
				minHeight: 24
			}
		}]
	};
}));
var StepConnector = /* @__PURE__ */ import_react.forwardRef(function StepConnector$1(inProps, ref) {
	const props = useDefaultProps({
		props: inProps,
		name: "MuiStepConnector"
	});
	const { className, ...other } = props;
	const { alternativeLabel, orientation = "horizontal" } = import_react.useContext(StepperContext_default);
	const { active, disabled, completed } = import_react.useContext(StepContext_default);
	const ownerState = {
		...props,
		alternativeLabel,
		orientation,
		active,
		completed,
		disabled
	};
	const classes = useUtilityClasses$1(ownerState);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StepConnectorRoot, {
		className: clsx_default(classes.root, className),
		ref,
		ownerState,
		...other,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StepConnectorLine, {
			className: classes.line,
			ownerState
		})
	});
});
StepConnector.propTypes = {
	classes: import_prop_types$1.default.object,
	className: import_prop_types$1.default.string,
	sx: import_prop_types$1.default.oneOfType([
		import_prop_types$1.default.arrayOf(import_prop_types$1.default.oneOfType([
			import_prop_types$1.default.func,
			import_prop_types$1.default.object,
			import_prop_types$1.default.bool
		])),
		import_prop_types$1.default.func,
		import_prop_types$1.default.object
	])
};
var StepConnector_default = StepConnector;

//#endregion
//#region node_modules/@mui/material/esm/Stepper/stepperClasses.js
function getStepperUtilityClass(slot) {
	return generateUtilityClass("MuiStepper", slot);
}
var stepperClasses = generateUtilityClasses("MuiStepper", [
	"root",
	"horizontal",
	"vertical",
	"nonLinear",
	"alternativeLabel"
]);
var stepperClasses_default = stepperClasses;

//#endregion
//#region node_modules/@mui/material/esm/Stepper/Stepper.js
var import_prop_types = /* @__PURE__ */ __toESM(require_prop_types(), 1);
var useUtilityClasses = (ownerState) => {
	const { orientation, nonLinear, alternativeLabel, classes } = ownerState;
	return composeClasses({ root: [
		"root",
		orientation,
		nonLinear && "nonLinear",
		alternativeLabel && "alternativeLabel"
	] }, getStepperUtilityClass, classes);
};
var StepperRoot = styled_default("div", {
	name: "MuiStepper",
	slot: "Root",
	overridesResolver: (props, styles) => {
		const { ownerState } = props;
		return [
			styles.root,
			styles[ownerState.orientation],
			ownerState.alternativeLabel && styles.alternativeLabel,
			ownerState.nonLinear && styles.nonLinear
		];
	}
})({
	display: "flex",
	variants: [
		{
			props: { orientation: "horizontal" },
			style: {
				flexDirection: "row",
				alignItems: "center"
			}
		},
		{
			props: { orientation: "vertical" },
			style: { flexDirection: "column" }
		},
		{
			props: { alternativeLabel: true },
			style: { alignItems: "flex-start" }
		}
	]
});
var defaultConnector = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StepConnector_default, {});
var Stepper = /* @__PURE__ */ import_react.forwardRef(function Stepper$1(inProps, ref) {
	const props = useDefaultProps({
		props: inProps,
		name: "MuiStepper"
	});
	const { activeStep = 0, alternativeLabel = false, children, className, component = "div", connector = defaultConnector, nonLinear = false, orientation = "horizontal", ...other } = props;
	const ownerState = {
		...props,
		nonLinear,
		alternativeLabel,
		orientation,
		component
	};
	const classes = useUtilityClasses(ownerState);
	const childrenArray = import_react.Children.toArray(children).filter(Boolean);
	const steps = childrenArray.map((step, index) => {
		return /* @__PURE__ */ import_react.cloneElement(step, {
			index,
			last: index + 1 === childrenArray.length,
			...step.props
		});
	});
	const contextValue = import_react.useMemo(() => ({
		activeStep,
		alternativeLabel,
		connector,
		nonLinear,
		orientation
	}), [
		activeStep,
		alternativeLabel,
		connector,
		nonLinear,
		orientation
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StepperContext_default.Provider, {
		value: contextValue,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StepperRoot, {
			as: component,
			ownerState,
			className: clsx_default(classes.root, className),
			ref,
			...other,
			children: steps
		})
	});
});
Stepper.propTypes = {
	activeStep: integerPropType_default,
	alternativeLabel: import_prop_types.default.bool,
	children: import_prop_types.default.node,
	classes: import_prop_types.default.object,
	className: import_prop_types.default.string,
	component: import_prop_types.default.elementType,
	connector: import_prop_types.default.element,
	nonLinear: import_prop_types.default.bool,
	orientation: import_prop_types.default.oneOf(["horizontal", "vertical"]),
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
var Stepper_default = Stepper;

//#endregion
export { getStepConnectorUtilityClass as a, StepConnector_default as i, getStepperUtilityClass as n, stepConnectorClasses_default as o, stepperClasses_default as r, Stepper_default as t };
//# sourceMappingURL=Stepper-C7vsGnNo.js.map