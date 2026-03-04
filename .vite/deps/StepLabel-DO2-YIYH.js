import { r as __toESM } from "./chunk-DUEDWNxO.js";
import { t as require_react } from "./react-Df7v5evG.js";
import { n as clsx_default } from "./clsx-BkYFeveK.js";
import { $ as generateUtilityClass, Dt as composeClasses, Ot as require_prop_types, bt as require_jsx_runtime, t as styled_default } from "./styled-CvD7q2Ek.js";
import { t as generateUtilityClasses } from "./generateUtilityClasses-JN_Zuvws.js";
import { t as memoTheme_default } from "./memoTheme-BB6g--Nk.js";
import { t as useDefaultProps } from "./DefaultPropsProvider-eRCtRYaZ.js";
import { n as createSvgIcon, r as SvgIcon_default, t as useForkRef } from "./useForkRef-B-BIqx4O.js";
import { i as appendOwnerState_default, r as resolveComponentProps_default, t as mergeSlotProps_default } from "./mergeSlotProps-BYhEWkiA.js";
import { r as StepperContext_default, t as StepContext_default } from "./StepContext-aDFQw0Cz.js";

//#region node_modules/@mui/material/esm/utils/useSlot.js
/**
* An internal function to create a Material UI slot.
*
* This is an advanced version of Base UI `useSlotProps` because Material UI allows leaf component to be customized via `component` prop
* while Base UI does not need to support leaf component customization.
*
* @param {string} name: name of the slot
* @param {object} parameters
* @returns {[Slot, slotProps]} The slot's React component and the slot's props
*
* Note: the returned slot's props
* - will never contain `component` prop.
* - might contain `as` prop.
*/
function useSlot(name, parameters) {
	const { className, elementType: initialElementType, ownerState, externalForwardedProps, internalForwardedProps, shouldForwardComponentProp = false, ...useSlotPropsParams } = parameters;
	const { component: rootComponent, slots = { [name]: void 0 }, slotProps = { [name]: void 0 }, ...other } = externalForwardedProps;
	const elementType = slots[name] || initialElementType;
	const resolvedComponentsProps = resolveComponentProps_default(slotProps[name], ownerState);
	const { props: { component: slotComponent, ...mergedProps }, internalRef } = mergeSlotProps_default({
		className,
		...useSlotPropsParams,
		externalForwardedProps: name === "root" ? other : void 0,
		externalSlotProps: resolvedComponentsProps
	});
	const ref = useForkRef(internalRef, resolvedComponentsProps?.ref, parameters.ref);
	const LeafComponent = name === "root" ? slotComponent || rootComponent : slotComponent;
	return [elementType, appendOwnerState_default(elementType, {
		...name === "root" && !rootComponent && !slots[name] && internalForwardedProps,
		...name !== "root" && !slots[name] && internalForwardedProps,
		...mergedProps,
		...LeafComponent && !shouldForwardComponentProp && { as: LeafComponent },
		...LeafComponent && shouldForwardComponentProp && { component: LeafComponent },
		ref
	}, ownerState)];
}

//#endregion
//#region node_modules/@mui/material/esm/internal/svg-icons/CheckCircle.js
var import_jsx_runtime = require_jsx_runtime();
var CheckCircle_default = createSvgIcon(/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M12 0a12 12 0 1 0 0 24 12 12 0 0 0 0-24zm-2 17l-5-5 1.4-1.4 3.6 3.6 7.6-7.6L19 8l-9 9z" }), "CheckCircle");

//#endregion
//#region node_modules/@mui/material/esm/internal/svg-icons/Warning.js
/**
* @ignore - internal component.
*/
var Warning_default = createSvgIcon(/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z" }), "Warning");

//#endregion
//#region node_modules/@mui/material/esm/StepIcon/stepIconClasses.js
function getStepIconUtilityClass(slot) {
	return generateUtilityClass("MuiStepIcon", slot);
}
var stepIconClasses = generateUtilityClasses("MuiStepIcon", [
	"root",
	"active",
	"completed",
	"error",
	"text"
]);
var stepIconClasses_default = stepIconClasses;

//#endregion
//#region node_modules/@mui/material/esm/StepIcon/StepIcon.js
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_prop_types$1 = /* @__PURE__ */ __toESM(require_prop_types(), 1);
var _circle;
var useUtilityClasses$1 = (ownerState) => {
	const { classes, active, completed, error } = ownerState;
	return composeClasses({
		root: [
			"root",
			active && "active",
			completed && "completed",
			error && "error"
		],
		text: ["text"]
	}, getStepIconUtilityClass, classes);
};
var StepIconRoot = styled_default(SvgIcon_default, {
	name: "MuiStepIcon",
	slot: "Root"
})(memoTheme_default(({ theme }) => ({
	display: "block",
	transition: theme.transitions.create("color", { duration: theme.transitions.duration.shortest }),
	color: (theme.vars || theme).palette.text.disabled,
	[`&.${stepIconClasses_default.completed}, &.${stepIconClasses_default.active}`]: { color: (theme.vars || theme).palette.primary.main },
	[`&.${stepIconClasses_default.error}`]: { color: (theme.vars || theme).palette.error.main }
})));
var StepIconText = styled_default("text", {
	name: "MuiStepIcon",
	slot: "Text"
})(memoTheme_default(({ theme }) => ({
	fill: (theme.vars || theme).palette.primary.contrastText,
	fontSize: theme.typography.caption.fontSize,
	fontFamily: theme.typography.fontFamily
})));
var StepIcon = /* @__PURE__ */ import_react.forwardRef(function StepIcon$1(inProps, ref) {
	const props = useDefaultProps({
		props: inProps,
		name: "MuiStepIcon"
	});
	const { active = false, className: classNameProp, completed = false, error = false, icon, ...other } = props;
	const ownerState = {
		...props,
		active,
		completed,
		error
	};
	const classes = useUtilityClasses$1(ownerState);
	if (typeof icon === "number" || typeof icon === "string") {
		const className = clsx_default(classNameProp, classes.root);
		if (error) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StepIconRoot, {
			as: Warning_default,
			className,
			ref,
			ownerState,
			...other
		});
		if (completed) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StepIconRoot, {
			as: CheckCircle_default,
			className,
			ref,
			ownerState,
			...other
		});
		return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(StepIconRoot, {
			className,
			ref,
			ownerState,
			...other,
			children: [_circle || (_circle = /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: "12",
				cy: "12",
				r: "12"
			})), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StepIconText, {
				className: classes.text,
				x: "12",
				y: "12",
				textAnchor: "middle",
				dominantBaseline: "central",
				ownerState,
				children: icon
			})]
		});
	}
	return icon;
});
StepIcon.propTypes = {
	active: import_prop_types$1.default.bool,
	classes: import_prop_types$1.default.object,
	className: import_prop_types$1.default.string,
	completed: import_prop_types$1.default.bool,
	error: import_prop_types$1.default.bool,
	icon: import_prop_types$1.default.node,
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
var StepIcon_default = StepIcon;

//#endregion
//#region node_modules/@mui/material/esm/StepLabel/stepLabelClasses.js
function getStepLabelUtilityClass(slot) {
	return generateUtilityClass("MuiStepLabel", slot);
}
var stepLabelClasses = generateUtilityClasses("MuiStepLabel", [
	"root",
	"horizontal",
	"vertical",
	"label",
	"active",
	"completed",
	"error",
	"disabled",
	"iconContainer",
	"alternativeLabel",
	"labelContainer"
]);
var stepLabelClasses_default = stepLabelClasses;

//#endregion
//#region node_modules/@mui/material/esm/StepLabel/StepLabel.js
var import_prop_types = /* @__PURE__ */ __toESM(require_prop_types(), 1);
var useUtilityClasses = (ownerState) => {
	const { classes, orientation, active, completed, error, disabled, alternativeLabel } = ownerState;
	return composeClasses({
		root: [
			"root",
			orientation,
			error && "error",
			disabled && "disabled",
			alternativeLabel && "alternativeLabel"
		],
		label: [
			"label",
			active && "active",
			completed && "completed",
			error && "error",
			disabled && "disabled",
			alternativeLabel && "alternativeLabel"
		],
		iconContainer: [
			"iconContainer",
			active && "active",
			completed && "completed",
			error && "error",
			disabled && "disabled",
			alternativeLabel && "alternativeLabel"
		],
		labelContainer: ["labelContainer", alternativeLabel && "alternativeLabel"]
	}, getStepLabelUtilityClass, classes);
};
var StepLabelRoot = styled_default("span", {
	name: "MuiStepLabel",
	slot: "Root",
	overridesResolver: (props, styles) => {
		const { ownerState } = props;
		return [styles.root, styles[ownerState.orientation]];
	}
})({
	display: "flex",
	alignItems: "center",
	[`&.${stepLabelClasses_default.alternativeLabel}`]: { flexDirection: "column" },
	[`&.${stepLabelClasses_default.disabled}`]: { cursor: "default" },
	variants: [{
		props: { orientation: "vertical" },
		style: {
			textAlign: "left",
			padding: "8px 0"
		}
	}]
});
var StepLabelLabel = styled_default("span", {
	name: "MuiStepLabel",
	slot: "Label"
})(memoTheme_default(({ theme }) => ({
	...theme.typography.body2,
	display: "block",
	transition: theme.transitions.create("color", { duration: theme.transitions.duration.shortest }),
	[`&.${stepLabelClasses_default.active}, &.${stepLabelClasses_default.completed}`]: {
		color: (theme.vars || theme).palette.text.primary,
		fontWeight: 500
	},
	[`&.${stepLabelClasses_default.alternativeLabel}`]: { marginTop: 16 },
	[`&.${stepLabelClasses_default.error}`]: { color: (theme.vars || theme).palette.error.main }
})));
var StepLabelIconContainer = styled_default("span", {
	name: "MuiStepLabel",
	slot: "IconContainer"
})({
	flexShrink: 0,
	display: "flex",
	paddingRight: 8,
	[`&.${stepLabelClasses_default.alternativeLabel}`]: { paddingRight: 0 }
});
var StepLabelLabelContainer = styled_default("span", {
	name: "MuiStepLabel",
	slot: "LabelContainer"
})(memoTheme_default(({ theme }) => ({
	width: "100%",
	color: (theme.vars || theme).palette.text.secondary,
	[`&.${stepLabelClasses_default.alternativeLabel}`]: { textAlign: "center" }
})));
var StepLabel = /* @__PURE__ */ import_react.forwardRef(function StepLabel$1(inProps, ref) {
	const props = useDefaultProps({
		props: inProps,
		name: "MuiStepLabel"
	});
	const { children, className, componentsProps = {}, error = false, icon: iconProp, optional, slots = {}, slotProps = {}, StepIconComponent: StepIconComponentProp, StepIconProps, ...other } = props;
	const { alternativeLabel, orientation } = import_react.useContext(StepperContext_default);
	const { active, disabled, completed, icon: iconContext } = import_react.useContext(StepContext_default);
	const icon = iconProp || iconContext;
	let StepIconComponent = StepIconComponentProp;
	if (icon && !StepIconComponent) StepIconComponent = StepIcon_default;
	const ownerState = {
		...props,
		active,
		alternativeLabel,
		completed,
		disabled,
		error,
		orientation
	};
	const classes = useUtilityClasses(ownerState);
	const externalForwardedProps = {
		slots,
		slotProps: {
			stepIcon: StepIconProps,
			...componentsProps,
			...slotProps
		}
	};
	const [RootSlot, rootProps] = useSlot("root", {
		elementType: StepLabelRoot,
		externalForwardedProps: {
			...externalForwardedProps,
			...other
		},
		ownerState,
		ref,
		className: clsx_default(classes.root, className)
	});
	const [LabelSlot, labelProps] = useSlot("label", {
		elementType: StepLabelLabel,
		externalForwardedProps,
		ownerState
	});
	const [StepIconSlot, stepIconProps] = useSlot("stepIcon", {
		elementType: StepIconComponent,
		externalForwardedProps,
		ownerState
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(RootSlot, {
		...rootProps,
		children: [icon || StepIconSlot ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StepLabelIconContainer, {
			className: classes.iconContainer,
			ownerState,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StepIconSlot, {
				completed,
				active,
				error,
				icon,
				...stepIconProps
			})
		}) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(StepLabelLabelContainer, {
			className: classes.labelContainer,
			ownerState,
			children: [children ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LabelSlot, {
				...labelProps,
				className: clsx_default(classes.label, labelProps?.className),
				children
			}) : null, optional]
		})]
	});
});
StepLabel.propTypes = {
	children: import_prop_types.default.node,
	classes: import_prop_types.default.object,
	className: import_prop_types.default.string,
	componentsProps: import_prop_types.default.shape({ label: import_prop_types.default.object }),
	error: import_prop_types.default.bool,
	icon: import_prop_types.default.node,
	optional: import_prop_types.default.node,
	slotProps: import_prop_types.default.shape({
		label: import_prop_types.default.oneOfType([import_prop_types.default.func, import_prop_types.default.object]),
		root: import_prop_types.default.oneOfType([import_prop_types.default.func, import_prop_types.default.object]),
		stepIcon: import_prop_types.default.oneOfType([import_prop_types.default.func, import_prop_types.default.object])
	}),
	slots: import_prop_types.default.shape({
		label: import_prop_types.default.elementType,
		root: import_prop_types.default.elementType,
		stepIcon: import_prop_types.default.elementType
	}),
	StepIconComponent: import_prop_types.default.elementType,
	StepIconProps: import_prop_types.default.object,
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
StepLabel.muiName = "StepLabel";
var StepLabel_default = StepLabel;

//#endregion
export { getStepIconUtilityClass as a, StepIcon_default as i, getStepLabelUtilityClass as n, stepIconClasses_default as o, stepLabelClasses_default as r, useSlot as s, StepLabel_default as t };
//# sourceMappingURL=StepLabel-DO2-YIYH.js.map