import { r as __toESM } from "./chunk-DUEDWNxO.js";
import { t as require_react } from "./react-Df7v5evG.js";
import { n as clsx_default } from "./clsx-BkYFeveK.js";
import { $ as generateUtilityClass, Dt as composeClasses, Ot as require_prop_types, bt as require_jsx_runtime, t as styled_default } from "./styled-CvD7q2Ek.js";
import "./extends-5nBDns8v.js";
import { t as generateUtilityClasses } from "./generateUtilityClasses-JN_Zuvws.js";
import { f as useThemeProps } from "./styles-CMzj7hcf.js";

//#region node_modules/@mui/lab/esm/TimelineConnector/timelineConnectorClasses.js
var import_prop_types = /* @__PURE__ */ __toESM(require_prop_types(), 1);
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
function getTimelineConnectorUtilityClass(slot) {
	return generateUtilityClass("MuiTimelineConnector", slot);
}
var timelineConnectorClasses = generateUtilityClasses("MuiTimelineConnector", ["root"]);
var timelineConnectorClasses_default = timelineConnectorClasses;

//#endregion
//#region node_modules/@mui/lab/esm/TimelineConnector/TimelineConnector.js
var import_jsx_runtime = require_jsx_runtime();
var useUtilityClasses = (ownerState) => {
	const { classes } = ownerState;
	return composeClasses({ root: ["root"] }, getTimelineConnectorUtilityClass, classes);
};
var TimelineConnectorRoot = styled_default("span", {
	name: "MuiTimelineConnector",
	slot: "Root"
})(({ theme }) => {
	return {
		width: 2,
		backgroundColor: (theme.vars || theme).palette.grey[400],
		flexGrow: 1
	};
});
var TimelineConnector = /* @__PURE__ */ import_react.forwardRef(function TimelineConnector$1(inProps, ref) {
	const props = useThemeProps({
		props: inProps,
		name: "MuiTimelineConnector"
	});
	const { className, ...other } = props;
	const ownerState = props;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TimelineConnectorRoot, {
		className: clsx_default(useUtilityClasses(ownerState).root, className),
		ownerState,
		ref,
		...other
	});
});
TimelineConnector.propTypes = {
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
var TimelineConnector_default = TimelineConnector;

//#endregion
export { TimelineConnector_default as default, getTimelineConnectorUtilityClass, timelineConnectorClasses_default as timelineConnectorClasses };
//# sourceMappingURL=@mui_lab_TimelineConnector.js.map