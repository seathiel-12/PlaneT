import { r as __toESM } from "./chunk-DUEDWNxO.js";
import { t as require_react } from "./react-Df7v5evG.js";
import { n as clsx_default } from "./clsx-BkYFeveK.js";
import "./react-dom-BK2eC1dR.js";
import { $ as generateUtilityClass, A as useId, Dt as composeClasses, F as alpha, N as useRtl, Ot as require_prop_types, Q as shouldForwardProp, bt as require_jsx_runtime, i as useTheme, q as useEnhancedEffect_default, t as styled_default } from "./styled-CvD7q2Ek.js";
import { t as _extends } from "./extends-5nBDns8v.js";
import "./extendSxProp-BtlBi6nz.js";
import { t as generateUtilityClasses } from "./generateUtilityClasses-JN_Zuvws.js";
import { a as useSlotProps_default, h as classNamesShape, m as forceReflow, n as Fade_default, o as IconButton_default, p as Transition_default, t as useMediaQuery_default } from "./useMediaQuery-BrKbpNwc.js";
import { a as useEventCallback_default, s as useControlled } from "./utils-C0KqTjXv.js";
import { f as useThemeProps } from "./styles-CMzj7hcf.js";
import "./memoTheme-BB6g--Nk.js";
import "./DefaultPropsProvider-eRCtRYaZ.js";
import { n as createSvgIcon, t as useForkRef } from "./useForkRef-B-BIqx4O.js";
import "./createSimplePaletteValueFilter-RIm_6coR.js";
import { t as Typography_default } from "./Typography-BkzQyBAt.js";
import { g as _inheritsLoose, i as ButtonBase_default, m as TransitionGroup_default } from "./CircularProgress-CdsTyA12.js";
import { t as _objectWithoutPropertiesLoose } from "./objectWithoutPropertiesLoose-B6EoAYRb.js";
import "./mergeSlotProps-BYhEWkiA.js";
import { r as PickerAdapterContext } from "./LocalizationProvider-DyQoxdQR.js";

//#region node_modules/dom-helpers/esm/hasClass.js
/**
* Checks if a given element has a CSS class.
* 
* @param element the element
* @param className the CSS class name
*/
function hasClass(element, className) {
	if (element.classList) return !!className && element.classList.contains(className);
	return (" " + (element.className.baseVal || element.className) + " ").indexOf(" " + className + " ") !== -1;
}

//#endregion
//#region node_modules/dom-helpers/esm/addClass.js
/**
* Adds a CSS class to a given element.
* 
* @param element the element
* @param className the CSS class name
*/
function addClass(element, className) {
	if (element.classList) element.classList.add(className);
	else if (!hasClass(element, className)) if (typeof element.className === "string") element.className = element.className + " " + className;
	else element.setAttribute("class", (element.className && element.className.baseVal || "") + " " + className);
}

//#endregion
//#region node_modules/dom-helpers/esm/removeClass.js
function replaceClassName(origClass, classToRemove) {
	return origClass.replace(new RegExp("(^|\\s)" + classToRemove + "(?:\\s|$)", "g"), "$1").replace(/\s+/g, " ").replace(/^\s*|\s*$/g, "");
}
/**
* Removes a CSS class from a given element.
* 
* @param element the element
* @param className the CSS class name
*/
function removeClass(element, className) {
	if (element.classList) element.classList.remove(className);
	else if (typeof element.className === "string") element.className = replaceClassName(element.className, className);
	else element.setAttribute("class", replaceClassName(element.className && element.className.baseVal || "", className));
}

//#endregion
//#region node_modules/react-transition-group/esm/CSSTransition.js
var import_prop_types$5 = /* @__PURE__ */ __toESM(require_prop_types());
var import_react = /* @__PURE__ */ __toESM(require_react());
var _addClass = function addClass$1(node, classes) {
	return node && classes && classes.split(" ").forEach(function(c) {
		return addClass(node, c);
	});
};
var removeClass$1 = function removeClass$2(node, classes) {
	return node && classes && classes.split(" ").forEach(function(c) {
		return removeClass(node, c);
	});
};
/**
* A transition component inspired by the excellent
* [ng-animate](https://docs.angularjs.org/api/ngAnimate) library, you should
* use it if you're using CSS transitions or animations. It's built upon the
* [`Transition`](https://reactcommunity.org/react-transition-group/transition)
* component, so it inherits all of its props.
*
* `CSSTransition` applies a pair of class names during the `appear`, `enter`,
* and `exit` states of the transition. The first class is applied and then a
* second `*-active` class in order to activate the CSS transition. After the
* transition, matching `*-done` class names are applied to persist the
* transition state.
*
* ```jsx
* function App() {
*   const [inProp, setInProp] = useState(false);
*   return (
*     <div>
*       <CSSTransition in={inProp} timeout={200} classNames="my-node">
*         <div>
*           {"I'll receive my-node-* classes"}
*         </div>
*       </CSSTransition>
*       <button type="button" onClick={() => setInProp(true)}>
*         Click to Enter
*       </button>
*     </div>
*   );
* }
* ```
*
* When the `in` prop is set to `true`, the child component will first receive
* the class `example-enter`, then the `example-enter-active` will be added in
* the next tick. `CSSTransition` [forces a
* reflow](https://github.com/reactjs/react-transition-group/blob/5007303e729a74be66a21c3e2205e4916821524b/src/CSSTransition.js#L208-L215)
* between before adding the `example-enter-active`. This is an important trick
* because it allows us to transition between `example-enter` and
* `example-enter-active` even though they were added immediately one after
* another. Most notably, this is what makes it possible for us to animate
* _appearance_.
*
* ```css
* .my-node-enter {
*   opacity: 0;
* }
* .my-node-enter-active {
*   opacity: 1;
*   transition: opacity 200ms;
* }
* .my-node-exit {
*   opacity: 1;
* }
* .my-node-exit-active {
*   opacity: 0;
*   transition: opacity 200ms;
* }
* ```
*
* `*-active` classes represent which styles you want to animate **to**, so it's
* important to add `transition` declaration only to them, otherwise transitions
* might not behave as intended! This might not be obvious when the transitions
* are symmetrical, i.e. when `*-enter-active` is the same as `*-exit`, like in
* the example above (minus `transition`), but it becomes apparent in more
* complex transitions.
*
* **Note**: If you're using the
* [`appear`](http://reactcommunity.org/react-transition-group/transition#Transition-prop-appear)
* prop, make sure to define styles for `.appear-*` classes as well.
*/
var CSSTransition = /* @__PURE__ */ function(_React$Component) {
	_inheritsLoose(CSSTransition$1, _React$Component);
	function CSSTransition$1() {
		var _this;
		for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) args[_key] = arguments[_key];
		_this = _React$Component.call.apply(_React$Component, [this].concat(args)) || this;
		_this.appliedClasses = {
			appear: {},
			enter: {},
			exit: {}
		};
		_this.onEnter = function(maybeNode, maybeAppearing) {
			var _this$resolveArgument = _this.resolveArguments(maybeNode, maybeAppearing), node = _this$resolveArgument[0], appearing = _this$resolveArgument[1];
			_this.removeClasses(node, "exit");
			_this.addClass(node, appearing ? "appear" : "enter", "base");
			if (_this.props.onEnter) _this.props.onEnter(maybeNode, maybeAppearing);
		};
		_this.onEntering = function(maybeNode, maybeAppearing) {
			var _this$resolveArgument2 = _this.resolveArguments(maybeNode, maybeAppearing), node = _this$resolveArgument2[0];
			var type = _this$resolveArgument2[1] ? "appear" : "enter";
			_this.addClass(node, type, "active");
			if (_this.props.onEntering) _this.props.onEntering(maybeNode, maybeAppearing);
		};
		_this.onEntered = function(maybeNode, maybeAppearing) {
			var _this$resolveArgument3 = _this.resolveArguments(maybeNode, maybeAppearing), node = _this$resolveArgument3[0];
			var type = _this$resolveArgument3[1] ? "appear" : "enter";
			_this.removeClasses(node, type);
			_this.addClass(node, type, "done");
			if (_this.props.onEntered) _this.props.onEntered(maybeNode, maybeAppearing);
		};
		_this.onExit = function(maybeNode) {
			var node = _this.resolveArguments(maybeNode)[0];
			_this.removeClasses(node, "appear");
			_this.removeClasses(node, "enter");
			_this.addClass(node, "exit", "base");
			if (_this.props.onExit) _this.props.onExit(maybeNode);
		};
		_this.onExiting = function(maybeNode) {
			var node = _this.resolveArguments(maybeNode)[0];
			_this.addClass(node, "exit", "active");
			if (_this.props.onExiting) _this.props.onExiting(maybeNode);
		};
		_this.onExited = function(maybeNode) {
			var node = _this.resolveArguments(maybeNode)[0];
			_this.removeClasses(node, "exit");
			_this.addClass(node, "exit", "done");
			if (_this.props.onExited) _this.props.onExited(maybeNode);
		};
		_this.resolveArguments = function(maybeNode, maybeAppearing) {
			return _this.props.nodeRef ? [_this.props.nodeRef.current, maybeNode] : [maybeNode, maybeAppearing];
		};
		_this.getClassNames = function(type) {
			var classNames = _this.props.classNames;
			var isStringClassNames = typeof classNames === "string";
			var prefix = isStringClassNames && classNames ? classNames + "-" : "";
			var baseClassName = isStringClassNames ? "" + prefix + type : classNames[type];
			return {
				baseClassName,
				activeClassName: isStringClassNames ? baseClassName + "-active" : classNames[type + "Active"],
				doneClassName: isStringClassNames ? baseClassName + "-done" : classNames[type + "Done"]
			};
		};
		return _this;
	}
	var _proto = CSSTransition$1.prototype;
	_proto.addClass = function addClass$1(node, type, phase) {
		var className = this.getClassNames(type)[phase + "ClassName"];
		var doneClassName = this.getClassNames("enter").doneClassName;
		if (type === "appear" && phase === "done" && doneClassName) className += " " + doneClassName;
		if (phase === "active") {
			if (node) forceReflow(node);
		}
		if (className) {
			this.appliedClasses[type][phase] = className;
			_addClass(node, className);
		}
	};
	_proto.removeClasses = function removeClasses(node, type) {
		var _this$appliedClasses$ = this.appliedClasses[type], baseClassName = _this$appliedClasses$.base, activeClassName = _this$appliedClasses$.active, doneClassName = _this$appliedClasses$.done;
		this.appliedClasses[type] = {};
		if (baseClassName) removeClass$1(node, baseClassName);
		if (activeClassName) removeClass$1(node, activeClassName);
		if (doneClassName) removeClass$1(node, doneClassName);
	};
	_proto.render = function render() {
		var _this$props = this.props;
		_this$props.classNames;
		var props = _objectWithoutPropertiesLoose(_this$props, ["classNames"]);
		return /* @__PURE__ */ import_react.createElement(Transition_default, _extends({}, props, {
			onEnter: this.onEnter,
			onEntered: this.onEntered,
			onEntering: this.onEntering,
			onExit: this.onExit,
			onExiting: this.onExiting,
			onExited: this.onExited
		}));
	};
	return CSSTransition$1;
}(import_react.Component);
CSSTransition.defaultProps = { classNames: "" };
CSSTransition.propTypes = _extends({}, Transition_default.propTypes, {
	classNames: classNamesShape,
	onEnter: import_prop_types$5.default.func,
	onEntering: import_prop_types$5.default.func,
	onEntered: import_prop_types$5.default.func,
	onExit: import_prop_types$5.default.func,
	onExiting: import_prop_types$5.default.func,
	onExited: import_prop_types$5.default.func
});
var CSSTransition_default = CSSTransition;

//#endregion
//#region node_modules/@mui/x-date-pickers/internals/utils/date-utils.mjs
const mergeDateAndTime = (adapter, dateParam, timeParam) => {
	let mergedDate = dateParam;
	mergedDate = adapter.setHours(mergedDate, adapter.getHours(timeParam));
	mergedDate = adapter.setMinutes(mergedDate, adapter.getMinutes(timeParam));
	mergedDate = adapter.setSeconds(mergedDate, adapter.getSeconds(timeParam));
	mergedDate = adapter.setMilliseconds(mergedDate, adapter.getMilliseconds(timeParam));
	return mergedDate;
};
const findClosestEnabledDate = ({ date, disableFuture, disablePast, maxDate, minDate, isDateDisabled, adapter, timezone }) => {
	const today = mergeDateAndTime(adapter, adapter.date(void 0, timezone), date);
	if (disablePast && adapter.isBefore(minDate, today)) minDate = today;
	if (disableFuture && adapter.isAfter(maxDate, today)) maxDate = today;
	let forward = date;
	let backward = date;
	if (adapter.isBefore(date, minDate)) {
		forward = minDate;
		backward = null;
	}
	if (adapter.isAfter(date, maxDate)) {
		if (backward) backward = maxDate;
		forward = null;
	}
	while (forward || backward) {
		if (forward && adapter.isAfter(forward, maxDate)) forward = null;
		if (backward && adapter.isBefore(backward, minDate)) backward = null;
		if (forward) {
			if (!isDateDisabled(forward)) return forward;
			forward = adapter.addDays(forward, 1);
		}
		if (backward) {
			if (!isDateDisabled(backward)) return backward;
			backward = adapter.addDays(backward, -1);
		}
	}
	return null;
};
const replaceInvalidDateByNull = (adapter, value) => !adapter.isValid(value) ? null : value;
const applyDefaultDate = (adapter, value, defaultValue) => {
	if (value == null || !adapter.isValid(value)) return defaultValue;
	return value;
};
const areDatesEqual = (adapter, a, b) => {
	if (!adapter.isValid(a) && a != null && !adapter.isValid(b) && b != null) return true;
	return adapter.isEqual(a, b);
};
const getMonthsInYear = (adapter, year) => {
	const months = [adapter.startOfYear(year)];
	while (months.length < 12) {
		const prevMonth = months[months.length - 1];
		months.push(adapter.addMonths(prevMonth, 1));
	}
	return months;
};
const getTodayDate = (adapter, timezone, valueType) => valueType === "date" ? adapter.startOfDay(adapter.date(void 0, timezone)) : adapter.date(void 0, timezone);
const getWeekdays = (adapter, date) => {
	const start = adapter.startOfWeek(date);
	return [
		0,
		1,
		2,
		3,
		4,
		5,
		6
	].map((diff) => adapter.addDays(start, diff));
};

//#endregion
//#region node_modules/@mui/x-date-pickers/internals/utils/time-utils.mjs
const getSecondsInDay = (date, adapter) => {
	return adapter.getHours(date) * 3600 + adapter.getMinutes(date) * 60 + adapter.getSeconds(date);
};
const createIsAfterIgnoreDatePart = (disableIgnoringDatePartForTimeValidation, adapter) => (dateLeft, dateRight) => {
	if (disableIgnoringDatePartForTimeValidation) return adapter.isAfter(dateLeft, dateRight);
	return getSecondsInDay(dateLeft, adapter) > getSecondsInDay(dateRight, adapter);
};

//#endregion
//#region node_modules/@mui/x-date-pickers/internals/utils/getDefaultReferenceDate.mjs
const SECTION_TYPE_GRANULARITY = {
	year: 1,
	month: 2,
	day: 3,
	hours: 4,
	minutes: 5,
	seconds: 6,
	milliseconds: 7
};
var roundDate = (adapter, granularity, date) => {
	if (granularity === SECTION_TYPE_GRANULARITY.year) return adapter.startOfYear(date);
	if (granularity === SECTION_TYPE_GRANULARITY.month) return adapter.startOfMonth(date);
	if (granularity === SECTION_TYPE_GRANULARITY.day) return adapter.startOfDay(date);
	let roundedDate = date;
	if (granularity < SECTION_TYPE_GRANULARITY.minutes) roundedDate = adapter.setMinutes(roundedDate, 0);
	if (granularity < SECTION_TYPE_GRANULARITY.seconds) roundedDate = adapter.setSeconds(roundedDate, 0);
	if (granularity < SECTION_TYPE_GRANULARITY.milliseconds) roundedDate = adapter.setMilliseconds(roundedDate, 0);
	return roundedDate;
};
const getDefaultReferenceDate = ({ props, adapter, granularity, timezone, getTodayDate: inGetTodayDate }) => {
	let referenceDate = inGetTodayDate ? inGetTodayDate() : roundDate(adapter, granularity, getTodayDate(adapter, timezone));
	if (props.minDate != null && adapter.isAfterDay(props.minDate, referenceDate)) referenceDate = roundDate(adapter, granularity, props.minDate);
	if (props.maxDate != null && adapter.isBeforeDay(props.maxDate, referenceDate)) referenceDate = roundDate(adapter, granularity, props.maxDate);
	const isAfter = createIsAfterIgnoreDatePart(props.disableIgnoringDatePartForTimeValidation ?? false, adapter);
	if (props.minTime != null && isAfter(props.minTime, referenceDate)) referenceDate = roundDate(adapter, granularity, props.disableIgnoringDatePartForTimeValidation ? props.minTime : mergeDateAndTime(adapter, referenceDate, props.minTime));
	if (props.maxTime != null && isAfter(referenceDate, props.maxTime)) referenceDate = roundDate(adapter, granularity, props.disableIgnoringDatePartForTimeValidation ? props.maxTime : mergeDateAndTime(adapter, referenceDate, props.maxTime));
	return referenceDate;
};

//#endregion
//#region node_modules/@mui/x-date-pickers/internals/utils/valueManagers.mjs
var _excluded$11 = ["value", "referenceDate"];
const singleItemValueManager = {
	emptyValue: null,
	getTodayValue: getTodayDate,
	getInitialReferenceValue: (_ref) => {
		let { value, referenceDate } = _ref, params = _objectWithoutPropertiesLoose(_ref, _excluded$11);
		if (params.adapter.isValid(value)) return value;
		if (referenceDate != null) return referenceDate;
		return getDefaultReferenceDate(params);
	},
	cleanValue: replaceInvalidDateByNull,
	areValuesEqual: areDatesEqual,
	isSameError: (a, b) => a === b,
	hasError: (error) => error != null,
	defaultErrorState: null,
	getTimezone: (adapter, value) => adapter.isValid(value) ? adapter.getTimezone(value) : null,
	setTimezone: (adapter, timezone, value) => value == null ? null : adapter.setTimezone(value, timezone)
};

//#endregion
//#region node_modules/@mui/x-date-pickers/validation/validateDate.mjs
/**
* Validation props used by the Date Picker, Date Field and Date Calendar components.
*/
/**
* Validation props as received by the validateDate method.
*/
/**
* Name of the props that should be defaulted before being passed to the validateDate method.
*/
const validateDate = ({ props, value, timezone, adapter }) => {
	if (value === null) return null;
	const { shouldDisableDate, shouldDisableMonth, shouldDisableYear, disablePast, disableFuture, minDate, maxDate } = props;
	const now = adapter.date(void 0, timezone);
	switch (true) {
		case !adapter.isValid(value): return "invalidDate";
		case Boolean(shouldDisableDate && shouldDisableDate(value)): return "shouldDisableDate";
		case Boolean(shouldDisableMonth && shouldDisableMonth(value)): return "shouldDisableMonth";
		case Boolean(shouldDisableYear && shouldDisableYear(value)): return "shouldDisableYear";
		case Boolean(disableFuture && adapter.isAfterDay(value, now)): return "disableFuture";
		case Boolean(disablePast && adapter.isBeforeDay(value, now)): return "disablePast";
		case Boolean(minDate && adapter.isBeforeDay(value, minDate)): return "minDate";
		case Boolean(maxDate && adapter.isAfterDay(value, maxDate)): return "maxDate";
		default: return null;
	}
};
validateDate.valueManager = singleItemValueManager;

//#endregion
//#region node_modules/@mui/x-date-pickers/locales/utils/getPickersLocalization.mjs
const getPickersLocalization = (pickersTranslations) => {
	return { components: { MuiLocalizationProvider: { defaultProps: { localeText: _extends({}, pickersTranslations) } } } };
};

//#endregion
//#region node_modules/@mui/x-date-pickers/locales/enUS.mjs
var enUSPickers = {
	previousMonth: "Previous month",
	nextMonth: "Next month",
	openPreviousView: "Open previous view",
	openNextView: "Open next view",
	calendarViewSwitchingButtonAriaLabel: (view) => view === "year" ? "year view is open, switch to calendar view" : "calendar view is open, switch to year view",
	start: "Start",
	end: "End",
	startDate: "Start date",
	startTime: "Start time",
	endDate: "End date",
	endTime: "End time",
	cancelButtonLabel: "Cancel",
	clearButtonLabel: "Clear",
	okButtonLabel: "OK",
	todayButtonLabel: "Today",
	nextStepButtonLabel: "Next",
	datePickerToolbarTitle: "Select date",
	dateTimePickerToolbarTitle: "Select date & time",
	timePickerToolbarTitle: "Select time",
	dateRangePickerToolbarTitle: "Select date range",
	timeRangePickerToolbarTitle: "Select time range",
	clockLabelText: (view, formattedTime) => `Select ${view}. ${!formattedTime ? "No time selected" : `Selected time is ${formattedTime}`}`,
	hoursClockNumberText: (hours) => `${hours} hours`,
	minutesClockNumberText: (minutes) => `${minutes} minutes`,
	secondsClockNumberText: (seconds) => `${seconds} seconds`,
	selectViewText: (view) => `Select ${view}`,
	calendarWeekNumberHeaderLabel: "Week number",
	calendarWeekNumberHeaderText: "#",
	calendarWeekNumberAriaLabelText: (weekNumber) => `Week ${weekNumber}`,
	calendarWeekNumberText: (weekNumber) => `${weekNumber}`,
	openDatePickerDialogue: (formattedDate) => formattedDate ? `Choose date, selected date is ${formattedDate}` : "Choose date",
	openTimePickerDialogue: (formattedTime) => formattedTime ? `Choose time, selected time is ${formattedTime}` : "Choose time",
	openRangePickerDialogue: (formattedRange) => formattedRange ? `Choose range, selected range is ${formattedRange}` : "Choose range",
	fieldClearLabel: "Clear",
	timeTableLabel: "pick time",
	dateTableLabel: "pick date",
	fieldYearPlaceholder: (params) => "Y".repeat(params.digitAmount),
	fieldMonthPlaceholder: (params) => params.contentType === "letter" ? "MMMM" : "MM",
	fieldDayPlaceholder: () => "DD",
	fieldWeekDayPlaceholder: (params) => params.contentType === "letter" ? "EEEE" : "EE",
	fieldHoursPlaceholder: () => "hh",
	fieldMinutesPlaceholder: () => "mm",
	fieldSecondsPlaceholder: () => "ss",
	fieldMeridiemPlaceholder: () => "aa",
	year: "Year",
	month: "Month",
	day: "Day",
	weekDay: "Week day",
	hours: "Hours",
	minutes: "Minutes",
	seconds: "Seconds",
	meridiem: "Meridiem",
	empty: "Empty"
};
const DEFAULT_LOCALE = enUSPickers;
const enUS = getPickersLocalization(enUSPickers);

//#endregion
//#region node_modules/@mui/x-date-pickers/hooks/usePickerAdapter.mjs
const useLocalizationContext = () => {
	const localization = import_react.useContext(PickerAdapterContext);
	if (localization === null) throw new Error([
		"MUI X: Can not find the date and time pickers localization context.",
		"It looks like you forgot to wrap your component in LocalizationProvider.",
		"This can also happen if you are bundling multiple versions of the `@mui/x-date-pickers` package"
	].join("\n"));
	if (localization.adapter === null) throw new Error(["MUI X: Can not find the date and time pickers adapter from its localization context.", "It looks like you forgot to pass a `dateAdapter` to your LocalizationProvider."].join("\n"));
	const localeText = import_react.useMemo(() => _extends({}, DEFAULT_LOCALE, localization.localeText), [localization.localeText]);
	return import_react.useMemo(() => _extends({}, localization, { localeText }), [localization, localeText]);
};
const usePickerAdapter = () => useLocalizationContext().adapter;

//#endregion
//#region node_modules/@mui/x-date-pickers/hooks/usePickerTranslations.mjs
const usePickerTranslations = () => useLocalizationContext().localeText;

//#endregion
//#region node_modules/@mui/x-date-pickers/internals/components/PickerProvider.mjs
var import_jsx_runtime = require_jsx_runtime();
const PickerActionsContext = /* @__PURE__ */ import_react.createContext(null);
PickerActionsContext.displayName = "PickerActionsContext";
const PickerPrivateContext = /* @__PURE__ */ import_react.createContext({
	ownerState: {
		isPickerDisabled: false,
		isPickerReadOnly: false,
		isPickerValueEmpty: false,
		isPickerOpen: false,
		pickerVariant: "desktop",
		pickerOrientation: "portrait"
	},
	rootRefObject: { current: null },
	labelId: void 0,
	dismissViews: () => {},
	hasUIView: true,
	getCurrentViewMode: () => "UI",
	triggerElement: null,
	viewContainerRole: null,
	defaultActionBarActions: [],
	onPopperExited: void 0
});
PickerPrivateContext.displayName = "PickerPrivateContext";

//#endregion
//#region node_modules/@mui/x-date-pickers/DateCalendar/useIsDateDisabled.mjs
const useIsDateDisabled = ({ shouldDisableDate, shouldDisableMonth, shouldDisableYear, minDate, maxDate, disableFuture, disablePast, timezone }) => {
	const adapter = usePickerAdapter();
	return import_react.useCallback((day) => validateDate({
		adapter,
		value: day,
		timezone,
		props: {
			shouldDisableDate,
			shouldDisableMonth,
			shouldDisableYear,
			minDate,
			maxDate,
			disableFuture,
			disablePast
		}
	}) !== null, [
		adapter,
		shouldDisableDate,
		shouldDisableMonth,
		shouldDisableYear,
		minDate,
		maxDate,
		disableFuture,
		disablePast,
		timezone
	]);
};

//#endregion
//#region node_modules/@mui/x-date-pickers/DateCalendar/useCalendarState.mjs
var createCalendarStateReducer = (reduceAnimations, adapter) => (state, action) => {
	switch (action.type) {
		case "setVisibleDate": return _extends({}, state, {
			slideDirection: action.direction,
			currentMonth: action.month,
			isMonthSwitchingAnimating: !adapter.isSameMonth(action.month, state.currentMonth) && !reduceAnimations && !action.skipAnimation,
			focusedDay: action.focusedDay
		});
		case "changeMonthTimezone": {
			const newTimezone = action.newTimezone;
			if (adapter.getTimezone(state.currentMonth) === newTimezone) return state;
			let newCurrentMonth = adapter.setTimezone(state.currentMonth, newTimezone);
			if (adapter.getMonth(newCurrentMonth) !== adapter.getMonth(state.currentMonth)) newCurrentMonth = adapter.setMonth(newCurrentMonth, adapter.getMonth(state.currentMonth));
			return _extends({}, state, { currentMonth: newCurrentMonth });
		}
		case "finishMonthSwitchingAnimation": return _extends({}, state, { isMonthSwitchingAnimating: false });
		default: throw new Error("missing support");
	}
};
const useCalendarState = (params) => {
	const { value, referenceDate: referenceDateProp, disableFuture, disablePast, maxDate, minDate, onMonthChange, onYearChange, reduceAnimations, shouldDisableDate, timezone, getCurrentMonthFromVisibleDate } = params;
	const adapter = usePickerAdapter();
	const reducerFn = import_react.useRef(createCalendarStateReducer(Boolean(reduceAnimations), adapter)).current;
	const referenceDate = import_react.useMemo(() => {
		return singleItemValueManager.getInitialReferenceValue({
			value,
			adapter,
			timezone,
			props: params,
			referenceDate: referenceDateProp,
			granularity: SECTION_TYPE_GRANULARITY.day
		});
	}, [referenceDateProp, timezone]);
	const [calendarState, dispatch] = import_react.useReducer(reducerFn, {
		isMonthSwitchingAnimating: false,
		focusedDay: referenceDate,
		currentMonth: adapter.setDate(referenceDate, 1),
		slideDirection: "left"
	});
	const isDateDisabled = useIsDateDisabled({
		shouldDisableDate,
		minDate,
		maxDate,
		disableFuture,
		disablePast,
		timezone
	});
	import_react.useEffect(() => {
		dispatch({
			type: "changeMonthTimezone",
			newTimezone: adapter.getTimezone(referenceDate)
		});
	}, [referenceDate, adapter]);
	return {
		referenceDate,
		calendarState,
		setVisibleDate: useEventCallback_default(({ target, reason }) => {
			if (reason === "cell-interaction" && calendarState.focusedDay != null && adapter.isSameDay(target, calendarState.focusedDay)) return;
			const skipAnimation = reason === "cell-interaction";
			let month;
			let focusedDay;
			if (reason === "cell-interaction") {
				month = getCurrentMonthFromVisibleDate(target, calendarState.currentMonth);
				focusedDay = target;
			} else {
				month = adapter.isSameMonth(target, calendarState.currentMonth) ? calendarState.currentMonth : adapter.startOfMonth(target);
				focusedDay = target;
				if (isDateDisabled(focusedDay)) {
					const startOfMonth = adapter.startOfMonth(target);
					const endOfMonth = adapter.endOfMonth(target);
					focusedDay = findClosestEnabledDate({
						adapter,
						date: focusedDay,
						minDate: adapter.isBefore(minDate, startOfMonth) ? startOfMonth : minDate,
						maxDate: adapter.isAfter(maxDate, endOfMonth) ? endOfMonth : maxDate,
						disablePast,
						disableFuture,
						isDateDisabled,
						timezone
					});
				}
			}
			const hasChangedMonth = !adapter.isSameMonth(calendarState.currentMonth, month);
			const hasChangedYear = !adapter.isSameYear(calendarState.currentMonth, month);
			if (hasChangedMonth) onMonthChange?.(month);
			if (hasChangedYear) onYearChange?.(adapter.startOfYear(month));
			dispatch({
				type: "setVisibleDate",
				month,
				direction: adapter.isAfterDay(month, calendarState.currentMonth) ? "left" : "right",
				focusedDay: calendarState.focusedDay != null && focusedDay != null && adapter.isSameDay(focusedDay, calendarState.focusedDay) ? calendarState.focusedDay : focusedDay,
				skipAnimation
			});
		}),
		isDateDisabled,
		onMonthSwitchingAnimationEnd: import_react.useCallback(() => {
			dispatch({ type: "finishMonthSwitchingAnimation" });
		}, [])
	};
};

//#endregion
//#region node_modules/@mui/x-date-pickers/DateCalendar/pickersFadeTransitionGroupClasses.mjs
const getPickersFadeTransitionGroupUtilityClass = (slot) => generateUtilityClass("MuiPickersFadeTransitionGroup", slot);
const pickersFadeTransitionGroupClasses = generateUtilityClasses("MuiPickersFadeTransitionGroup", ["root"]);

//#endregion
//#region node_modules/@mui/x-date-pickers/DateCalendar/PickersFadeTransitionGroup.mjs
var _excluded$10 = ["children"];
var useUtilityClasses$10 = (classes) => {
	return composeClasses({ root: ["root"] }, getPickersFadeTransitionGroupUtilityClass, classes);
};
var PickersFadeTransitionGroupRoot = styled_default(TransitionGroup_default, {
	name: "MuiPickersFadeTransitionGroup",
	slot: "Root"
})({
	display: "block",
	position: "relative"
});
/**
* @ignore - do not document.
*/
function PickersFadeTransitionGroup(inProps) {
	const props = useThemeProps({
		props: inProps,
		name: "MuiPickersFadeTransitionGroup"
	});
	const { className, reduceAnimations, transKey, classes: classesProp } = props;
	const { children } = props, other = _objectWithoutPropertiesLoose(props, _excluded$10);
	const classes = useUtilityClasses$10(classesProp);
	const theme = useTheme();
	if (reduceAnimations) return children;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PickersFadeTransitionGroupRoot, {
		className: clsx_default(classes.root, className),
		ownerState: other,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Fade_default, {
			appear: false,
			mountOnEnter: true,
			unmountOnExit: true,
			timeout: {
				appear: theme.transitions.duration.enteringScreen,
				enter: theme.transitions.duration.enteringScreen,
				exit: 0
			},
			children
		}, transKey)
	});
}

//#endregion
//#region node_modules/@mui/x-date-pickers/internals/constants/dimensions.mjs
const DAY_SIZE = 36;
const DAY_MARGIN = 2;
const DIALOG_WIDTH = 320;
const MAX_CALENDAR_HEIGHT = 280;
const VIEW_HEIGHT = 336;

//#endregion
//#region node_modules/@mui/x-date-pickers/PickersDay/pickersDayClasses.mjs
function getPickersDayUtilityClass(slot) {
	return generateUtilityClass("MuiPickersDay", slot);
}
const pickersDayClasses = generateUtilityClasses("MuiPickersDay", [
	"root",
	"dayWithMargin",
	"dayOutsideMonth",
	"hiddenDaySpacingFiller",
	"today",
	"selected",
	"disabled"
]);

//#endregion
//#region node_modules/@mui/x-date-pickers/internals/hooks/usePickerPrivateContext.mjs
/**
* Returns the private context passed by the Picker wrapping the current component.
*/
const usePickerPrivateContext = () => import_react.useContext(PickerPrivateContext);

//#endregion
//#region node_modules/@mui/x-date-pickers/PickersDay/usePickerDayOwnerState.mjs
function usePickerDayOwnerState(parameters) {
	const { disabled, selected, today, outsideCurrentMonth, day, disableMargin, disableHighlightToday, showDaysOutsideCurrentMonth } = parameters;
	const adapter = usePickerAdapter();
	const { ownerState: pickerOwnerState } = usePickerPrivateContext();
	return import_react.useMemo(() => _extends({}, pickerOwnerState, {
		day,
		isDaySelected: selected ?? false,
		isDayDisabled: disabled ?? false,
		isDayCurrent: today ?? false,
		isDayOutsideMonth: outsideCurrentMonth ?? false,
		isDayStartOfWeek: adapter.isSameDay(day, adapter.startOfWeek(day)),
		isDayEndOfWeek: adapter.isSameDay(day, adapter.endOfWeek(day)),
		disableMargin: disableMargin ?? false,
		disableHighlightToday: disableHighlightToday ?? false,
		showDaysOutsideCurrentMonth: showDaysOutsideCurrentMonth ?? false
	}), [
		adapter,
		pickerOwnerState,
		day,
		selected,
		disabled,
		today,
		outsideCurrentMonth,
		disableMargin,
		disableHighlightToday,
		showDaysOutsideCurrentMonth
	]);
}

//#endregion
//#region node_modules/@mui/x-date-pickers/PickersDay/PickersDay.mjs
var import_prop_types$4 = /* @__PURE__ */ __toESM(require_prop_types(), 1);
var _excluded$9 = [
	"autoFocus",
	"className",
	"classes",
	"hidden",
	"isAnimating",
	"onClick",
	"onDaySelect",
	"onFocus",
	"onBlur",
	"onKeyDown",
	"onMouseDown",
	"onMouseEnter",
	"children",
	"isFirstVisibleCell",
	"isLastVisibleCell",
	"day",
	"selected",
	"disabled",
	"today",
	"outsideCurrentMonth",
	"disableMargin",
	"disableHighlightToday",
	"showDaysOutsideCurrentMonth"
];
var useUtilityClasses$9 = (classes, ownerState) => {
	const { isDaySelected, isDayDisabled, isDayCurrent, isDayOutsideMonth, disableMargin, disableHighlightToday, showDaysOutsideCurrentMonth } = ownerState;
	const isHiddenDaySpacingFiller = isDayOutsideMonth && !showDaysOutsideCurrentMonth;
	return composeClasses({
		root: [
			"root",
			isDaySelected && !isHiddenDaySpacingFiller && "selected",
			isDayDisabled && "disabled",
			!disableMargin && "dayWithMargin",
			!disableHighlightToday && isDayCurrent && "today",
			isDayOutsideMonth && showDaysOutsideCurrentMonth && "dayOutsideMonth",
			isHiddenDaySpacingFiller && "hiddenDaySpacingFiller"
		],
		hiddenDaySpacingFiller: ["hiddenDaySpacingFiller"]
	}, getPickersDayUtilityClass, classes);
};
var styleArg = ({ theme }) => _extends({}, theme.typography.caption, {
	display: "flex",
	lineHeight: 1,
	width: DAY_SIZE,
	height: DAY_SIZE,
	borderRadius: "50%",
	padding: 0,
	backgroundColor: "transparent",
	transition: theme.transitions.create("background-color", { duration: theme.transitions.duration.short }),
	color: (theme.vars || theme).palette.text.primary,
	"@media (pointer: fine)": { "&:hover": { backgroundColor: theme.vars ? `rgba(${theme.vars.palette.primary.mainChannel} / ${theme.vars.palette.action.hoverOpacity})` : alpha(theme.palette.primary.main, theme.palette.action.hoverOpacity) } },
	"&:focus": {
		backgroundColor: theme.vars ? `rgba(${theme.vars.palette.primary.mainChannel} / ${theme.vars.palette.action.focusOpacity})` : alpha(theme.palette.primary.main, theme.palette.action.focusOpacity),
		[`&.${pickersDayClasses.selected}`]: {
			willChange: "background-color",
			backgroundColor: (theme.vars || theme).palette.primary.dark
		}
	},
	[`&.${pickersDayClasses.selected}`]: {
		color: (theme.vars || theme).palette.primary.contrastText,
		backgroundColor: (theme.vars || theme).palette.primary.main,
		fontWeight: theme.typography.fontWeightMedium,
		"&:hover": {
			willChange: "background-color",
			backgroundColor: (theme.vars || theme).palette.primary.dark
		}
	},
	[`&.${pickersDayClasses.disabled}:not(.${pickersDayClasses.selected})`]: { color: (theme.vars || theme).palette.text.disabled },
	[`&.${pickersDayClasses.disabled}&.${pickersDayClasses.selected}`]: { opacity: .6 },
	variants: [
		{
			props: { disableMargin: false },
			style: { margin: `0 ${DAY_MARGIN}px` }
		},
		{
			props: {
				isDayOutsideMonth: true,
				showDaysOutsideCurrentMonth: true
			},
			style: { color: (theme.vars || theme).palette.text.secondary }
		},
		{
			props: {
				disableHighlightToday: false,
				isDayCurrent: true
			},
			style: { [`&:not(.${pickersDayClasses.selected})`]: { border: `1px solid ${(theme.vars || theme).palette.text.secondary}` } }
		}
	]
});
var overridesResolver = (props, styles) => {
	const { ownerState } = props;
	return [
		styles.root,
		!ownerState.disableMargin && styles.dayWithMargin,
		!ownerState.disableHighlightToday && ownerState.isDayCurrent && styles.today,
		ownerState.isDayOutsideMonth && ownerState.showDaysOutsideCurrentMonth && styles.dayOutsideMonth,
		ownerState.isDayOutsideMonth && !ownerState.showDaysOutsideCurrentMonth && styles.hiddenDaySpacingFiller
	];
};
var PickersDayRoot = styled_default(ButtonBase_default, {
	name: "MuiPickersDay",
	slot: "Root",
	overridesResolver
})(styleArg);
var PickersDayFiller = styled_default("div", {
	name: "MuiPickersDay",
	slot: "Root",
	overridesResolver
})(({ theme }) => _extends({}, styleArg({ theme }), {
	opacity: 0,
	pointerEvents: "none"
}));
var noop = () => {};
var PickersDayRaw = /* @__PURE__ */ import_react.forwardRef(function PickersDay$1(inProps, forwardedRef) {
	const props = useThemeProps({
		props: inProps,
		name: "MuiPickersDay"
	});
	const { autoFocus = false, className, classes: classesProp, isAnimating, onClick, onDaySelect, onFocus = noop, onBlur = noop, onKeyDown = noop, onMouseDown = noop, onMouseEnter = noop, children, day, selected, disabled, today, outsideCurrentMonth, disableMargin, disableHighlightToday, showDaysOutsideCurrentMonth } = props, other = _objectWithoutPropertiesLoose(props, _excluded$9);
	const ownerState = usePickerDayOwnerState({
		day,
		selected,
		disabled,
		today,
		outsideCurrentMonth,
		disableMargin,
		disableHighlightToday,
		showDaysOutsideCurrentMonth
	});
	const classes = useUtilityClasses$9(classesProp, ownerState);
	const adapter = usePickerAdapter();
	const ref = import_react.useRef(null);
	const handleRef = useForkRef(ref, forwardedRef);
	useEnhancedEffect_default(() => {
		if (autoFocus && !disabled && !isAnimating && !outsideCurrentMonth) ref.current.focus();
	}, [
		autoFocus,
		disabled,
		isAnimating,
		outsideCurrentMonth
	]);
	const handleMouseDown = (event) => {
		onMouseDown(event);
		if (outsideCurrentMonth) event.preventDefault();
	};
	const handleClick = (event) => {
		event.defaultMuiPrevented = true;
		if (!disabled) onDaySelect(day);
		if (outsideCurrentMonth) event.currentTarget.focus();
		if (onClick) onClick(event);
	};
	if (outsideCurrentMonth && !showDaysOutsideCurrentMonth) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PickersDayFiller, {
		className: clsx_default(classes.root, classes.hiddenDaySpacingFiller, className),
		ownerState,
		role: other.role
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PickersDayRoot, _extends({
		className: clsx_default(classes.root, className),
		ref: handleRef,
		centerRipple: true,
		disabled,
		tabIndex: selected ? 0 : -1,
		onKeyDown: (event) => onKeyDown(event, day),
		onFocus: (event) => onFocus(event, day),
		onBlur: (event) => onBlur(event, day),
		onMouseEnter: (event) => onMouseEnter(event, day),
		onClick: handleClick,
		onMouseDown: handleMouseDown
	}, other, {
		ownerState,
		children: children ?? adapter.format(day, "dayOfMonth")
	}));
});
PickersDayRaw.displayName = "PickersDayRaw";
PickersDayRaw.propTypes = {
	action: import_prop_types$4.default.oneOfType([import_prop_types$4.default.func, import_prop_types$4.default.shape({ current: import_prop_types$4.default.shape({ focusVisible: import_prop_types$4.default.func.isRequired }) })]),
	centerRipple: import_prop_types$4.default.bool,
	classes: import_prop_types$4.default.object,
	className: import_prop_types$4.default.string,
	component: import_prop_types$4.default.elementType,
	day: import_prop_types$4.default.object.isRequired,
	disabled: import_prop_types$4.default.bool,
	disableHighlightToday: import_prop_types$4.default.bool,
	disableMargin: import_prop_types$4.default.bool,
	disableRipple: import_prop_types$4.default.bool,
	disableTouchRipple: import_prop_types$4.default.bool,
	focusRipple: import_prop_types$4.default.bool,
	focusVisibleClassName: import_prop_types$4.default.string,
	isAnimating: import_prop_types$4.default.bool,
	isFirstVisibleCell: import_prop_types$4.default.bool.isRequired,
	isLastVisibleCell: import_prop_types$4.default.bool.isRequired,
	onBlur: import_prop_types$4.default.func,
	onDaySelect: import_prop_types$4.default.func.isRequired,
	onFocus: import_prop_types$4.default.func,
	onFocusVisible: import_prop_types$4.default.func,
	onKeyDown: import_prop_types$4.default.func,
	onMouseEnter: import_prop_types$4.default.func,
	outsideCurrentMonth: import_prop_types$4.default.bool.isRequired,
	selected: import_prop_types$4.default.bool,
	showDaysOutsideCurrentMonth: import_prop_types$4.default.bool,
	style: import_prop_types$4.default.object,
	sx: import_prop_types$4.default.oneOfType([
		import_prop_types$4.default.arrayOf(import_prop_types$4.default.oneOfType([
			import_prop_types$4.default.func,
			import_prop_types$4.default.object,
			import_prop_types$4.default.bool
		])),
		import_prop_types$4.default.func,
		import_prop_types$4.default.object
	]),
	tabIndex: import_prop_types$4.default.number,
	today: import_prop_types$4.default.bool,
	TouchRippleProps: import_prop_types$4.default.object,
	touchRippleRef: import_prop_types$4.default.oneOfType([import_prop_types$4.default.func, import_prop_types$4.default.shape({ current: import_prop_types$4.default.shape({
		pulsate: import_prop_types$4.default.func.isRequired,
		start: import_prop_types$4.default.func.isRequired,
		stop: import_prop_types$4.default.func.isRequired
	}) })])
};
/**
* Demos:
*
* - [DateCalendar](https://mui.com/x/react-date-pickers/date-calendar/)
* API:
*
* - [PickersDay API](https://mui.com/x/api/date-pickers/pickers-day/)
*/
const PickersDay = /* @__PURE__ */ import_react.memo(PickersDayRaw);
PickersDay.displayName = "PickersDay";

//#endregion
//#region node_modules/@mui/x-date-pickers/internals/hooks/useUtils.mjs
const useDefaultDates = () => useLocalizationContext().defaultDates;
const useNow = (timezone) => {
	const adapter = usePickerAdapter();
	const now = import_react.useRef(void 0);
	if (now.current === void 0) now.current = adapter.date(void 0, timezone);
	return now.current;
};

//#endregion
//#region node_modules/@mui/x-date-pickers/DateCalendar/pickersSlideTransitionClasses.mjs
const getPickersSlideTransitionUtilityClass = (slot) => generateUtilityClass("MuiPickersSlideTransition", slot);
const pickersSlideTransitionClasses = generateUtilityClasses("MuiPickersSlideTransition", [
	"root",
	"slideEnter-left",
	"slideEnter-right",
	"slideEnterActive",
	"slideExit",
	"slideExitActiveLeft-left",
	"slideExitActiveLeft-right"
]);

//#endregion
//#region node_modules/@mui/x-date-pickers/DateCalendar/PickersSlideTransition.mjs
var _excluded$8 = [
	"children",
	"className",
	"reduceAnimations",
	"slideDirection",
	"transKey",
	"classes"
];
var useUtilityClasses$8 = (classes, ownerState) => {
	const { slideDirection } = ownerState;
	return composeClasses({
		root: ["root"],
		exit: ["slideExit"],
		enterActive: ["slideEnterActive"],
		enter: [`slideEnter-${slideDirection}`],
		exitActive: [`slideExitActiveLeft-${slideDirection}`]
	}, getPickersSlideTransitionUtilityClass, classes);
};
var PickersSlideTransitionRoot = styled_default(TransitionGroup_default, {
	name: "MuiPickersSlideTransition",
	slot: "Root",
	overridesResolver: (_, styles) => [
		styles.root,
		{ [`.${pickersSlideTransitionClasses["slideEnter-left"]}`]: styles["slideEnter-left"] },
		{ [`.${pickersSlideTransitionClasses["slideEnter-right"]}`]: styles["slideEnter-right"] },
		{ [`.${pickersSlideTransitionClasses.slideEnterActive}`]: styles.slideEnterActive },
		{ [`.${pickersSlideTransitionClasses.slideExit}`]: styles.slideExit },
		{ [`.${pickersSlideTransitionClasses["slideExitActiveLeft-left"]}`]: styles["slideExitActiveLeft-left"] },
		{ [`.${pickersSlideTransitionClasses["slideExitActiveLeft-right"]}`]: styles["slideExitActiveLeft-right"] }
	]
})(({ theme }) => {
	const slideTransition = theme.transitions.create("transform", {
		duration: theme.transitions.duration.complex,
		easing: "cubic-bezier(0.35, 0.8, 0.4, 1)"
	});
	return {
		display: "block",
		position: "relative",
		overflowX: "hidden",
		"& > *": {
			position: "absolute",
			top: 0,
			right: 0,
			left: 0
		},
		[`& .${pickersSlideTransitionClasses["slideEnter-left"]}`]: {
			willChange: "transform",
			transform: "translate(100%)",
			zIndex: 1
		},
		[`& .${pickersSlideTransitionClasses["slideEnter-right"]}`]: {
			willChange: "transform",
			transform: "translate(-100%)",
			zIndex: 1
		},
		[`& .${pickersSlideTransitionClasses.slideEnterActive}`]: {
			transform: "translate(0%)",
			transition: slideTransition
		},
		[`& .${pickersSlideTransitionClasses.slideExit}`]: { transform: "translate(0%)" },
		[`& .${pickersSlideTransitionClasses["slideExitActiveLeft-left"]}`]: {
			willChange: "transform",
			transform: "translate(-100%)",
			transition: slideTransition,
			zIndex: 0
		},
		[`& .${pickersSlideTransitionClasses["slideExitActiveLeft-right"]}`]: {
			willChange: "transform",
			transform: "translate(100%)",
			transition: slideTransition,
			zIndex: 0
		}
	};
});
/**
* @ignore - do not document.
*/
function PickersSlideTransition(inProps) {
	const props = useThemeProps({
		props: inProps,
		name: "MuiPickersSlideTransition"
	});
	const { children, className, reduceAnimations, slideDirection, transKey, classes: classesProp } = props, other = _objectWithoutPropertiesLoose(props, _excluded$8);
	const { ownerState: pickerOwnerState } = usePickerPrivateContext();
	const ownerState = _extends({}, pickerOwnerState, { slideDirection });
	const classes = useUtilityClasses$8(classesProp, ownerState);
	const theme = useTheme();
	if (reduceAnimations) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: clsx_default(classes.root, className),
		children
	});
	const transitionClasses = {
		exit: classes.exit,
		enterActive: classes.enterActive,
		enter: classes.enter,
		exitActive: classes.exitActive
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PickersSlideTransitionRoot, {
		className: clsx_default(classes.root, className),
		childFactory: (element) => /* @__PURE__ */ import_react.cloneElement(element, { classNames: transitionClasses }),
		role: "presentation",
		ownerState,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CSSTransition_default, _extends({
			mountOnEnter: true,
			unmountOnExit: true,
			timeout: theme.transitions.duration.complex,
			classNames: transitionClasses
		}, other, { children }), transKey)
	});
}

//#endregion
//#region node_modules/@mui/x-date-pickers/DateCalendar/dayCalendarClasses.mjs
const getDayCalendarUtilityClass = (slot) => generateUtilityClass("MuiDayCalendar", slot);
const dayCalendarClasses = generateUtilityClasses("MuiDayCalendar", [
	"root",
	"header",
	"weekDayLabel",
	"loadingContainer",
	"slideTransition",
	"monthContainer",
	"weekContainer",
	"weekNumberLabel",
	"weekNumber"
]);

//#endregion
//#region node_modules/@mui/x-date-pickers/DateCalendar/DayCalendar.mjs
var _excluded$7 = [
	"parentProps",
	"day",
	"focusedDay",
	"selectedDays",
	"isDateDisabled",
	"currentMonthNumber",
	"isViewFocused"
], _excluded2$2 = ["ownerState"];
var useUtilityClasses$7 = (classes) => {
	return composeClasses({
		root: ["root"],
		header: ["header"],
		weekDayLabel: ["weekDayLabel"],
		loadingContainer: ["loadingContainer"],
		slideTransition: ["slideTransition"],
		monthContainer: ["monthContainer"],
		weekContainer: ["weekContainer"],
		weekNumberLabel: ["weekNumberLabel"],
		weekNumber: ["weekNumber"]
	}, getDayCalendarUtilityClass, classes);
};
var weeksContainerHeight = (DAY_SIZE + DAY_MARGIN * 2) * 6;
var PickersCalendarDayRoot = styled_default("div", {
	name: "MuiDayCalendar",
	slot: "Root"
})({});
var PickersCalendarDayHeader = styled_default("div", {
	name: "MuiDayCalendar",
	slot: "Header"
})({
	display: "flex",
	justifyContent: "center",
	alignItems: "center"
});
var PickersCalendarWeekDayLabel = styled_default(Typography_default, {
	name: "MuiDayCalendar",
	slot: "WeekDayLabel"
})(({ theme }) => ({
	width: 36,
	height: 40,
	margin: "0 2px",
	textAlign: "center",
	display: "flex",
	justifyContent: "center",
	alignItems: "center",
	color: (theme.vars || theme).palette.text.secondary
}));
var PickersCalendarWeekNumberLabel = styled_default(Typography_default, {
	name: "MuiDayCalendar",
	slot: "WeekNumberLabel"
})(({ theme }) => ({
	width: 36,
	height: 40,
	margin: "0 2px",
	textAlign: "center",
	display: "flex",
	justifyContent: "center",
	alignItems: "center",
	color: (theme.vars || theme).palette.text.disabled
}));
var PickersCalendarWeekNumber = styled_default(Typography_default, {
	name: "MuiDayCalendar",
	slot: "WeekNumber"
})(({ theme }) => _extends({}, theme.typography.caption, {
	width: DAY_SIZE,
	height: DAY_SIZE,
	padding: 0,
	margin: `0 ${DAY_MARGIN}px`,
	color: (theme.vars || theme).palette.text.disabled,
	fontSize: "0.75rem",
	alignItems: "center",
	justifyContent: "center",
	display: "inline-flex"
}));
var PickersCalendarLoadingContainer = styled_default("div", {
	name: "MuiDayCalendar",
	slot: "LoadingContainer"
})({
	display: "flex",
	justifyContent: "center",
	alignItems: "center",
	minHeight: weeksContainerHeight
});
var PickersCalendarSlideTransition = styled_default(PickersSlideTransition, {
	name: "MuiDayCalendar",
	slot: "SlideTransition"
})({ minHeight: weeksContainerHeight });
var PickersCalendarWeekContainer = styled_default("div", {
	name: "MuiDayCalendar",
	slot: "MonthContainer"
})({ overflow: "hidden" });
var PickersCalendarWeek = styled_default("div", {
	name: "MuiDayCalendar",
	slot: "WeekContainer"
})({
	margin: `${DAY_MARGIN}px 0`,
	display: "flex",
	justifyContent: "center"
});
function WrappedDay(_ref) {
	let { parentProps, day, focusedDay, selectedDays, isDateDisabled, currentMonthNumber, isViewFocused } = _ref, other = _objectWithoutPropertiesLoose(_ref, _excluded$7);
	const { disabled, disableHighlightToday, isMonthSwitchingAnimating, showDaysOutsideCurrentMonth, slots, slotProps, timezone } = parentProps;
	const adapter = usePickerAdapter();
	const now = useNow(timezone);
	const isFocusableDay = focusedDay != null && adapter.isSameDay(day, focusedDay);
	const isFocusedDay = isViewFocused && isFocusableDay;
	const isSelected = selectedDays.some((selectedDay) => adapter.isSameDay(selectedDay, day));
	const isToday = adapter.isSameDay(day, now);
	const isDisabled = import_react.useMemo(() => disabled || isDateDisabled(day), [
		disabled,
		isDateDisabled,
		day
	]);
	const isOutsideCurrentMonth = import_react.useMemo(() => adapter.getMonth(day) !== currentMonthNumber, [
		adapter,
		day,
		currentMonthNumber
	]);
	const ownerState = usePickerDayOwnerState({
		day,
		selected: isSelected,
		disabled: isDisabled,
		today: isToday,
		outsideCurrentMonth: isOutsideCurrentMonth,
		disableMargin: void 0,
		disableHighlightToday,
		showDaysOutsideCurrentMonth
	});
	const Day = slots?.day ?? PickersDay;
	const dayProps = _objectWithoutPropertiesLoose(useSlotProps_default({
		elementType: Day,
		externalSlotProps: slotProps?.day,
		additionalProps: _extends({
			disableHighlightToday,
			showDaysOutsideCurrentMonth,
			role: "gridcell",
			isAnimating: isMonthSwitchingAnimating,
			"data-timestamp": adapter.toJsDate(day).valueOf()
		}, other),
		ownerState: _extends({}, ownerState, {
			day,
			isDayDisabled: isDisabled,
			isDaySelected: isSelected
		})
	}), _excluded2$2);
	const isFirstVisibleCell = import_react.useMemo(() => {
		const startOfMonth = adapter.startOfMonth(adapter.setMonth(day, currentMonthNumber));
		if (!showDaysOutsideCurrentMonth) return adapter.isSameDay(day, startOfMonth);
		return adapter.isSameDay(day, adapter.startOfWeek(startOfMonth));
	}, [
		currentMonthNumber,
		day,
		showDaysOutsideCurrentMonth,
		adapter
	]);
	const isLastVisibleCell = import_react.useMemo(() => {
		const endOfMonth = adapter.endOfMonth(adapter.setMonth(day, currentMonthNumber));
		if (!showDaysOutsideCurrentMonth) return adapter.isSameDay(day, endOfMonth);
		return adapter.isSameDay(day, adapter.endOfWeek(endOfMonth));
	}, [
		currentMonthNumber,
		day,
		showDaysOutsideCurrentMonth,
		adapter
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Day, _extends({}, dayProps, {
		day,
		disabled: isDisabled,
		autoFocus: !isOutsideCurrentMonth && isFocusedDay,
		today: isToday,
		outsideCurrentMonth: isOutsideCurrentMonth,
		isFirstVisibleCell,
		isLastVisibleCell,
		selected: isSelected,
		tabIndex: isFocusableDay ? 0 : -1,
		"aria-selected": isSelected,
		"aria-current": isToday ? "date" : void 0
	}));
}
/**
* @ignore - do not document.
*/
function DayCalendar(inProps) {
	const props = useThemeProps({
		props: inProps,
		name: "MuiDayCalendar"
	});
	const adapter = usePickerAdapter();
	const { onFocusedDayChange, className, classes: classesProp, currentMonth, selectedDays, focusedDay, loading, onSelectedDaysChange, onMonthSwitchingAnimationEnd, readOnly, reduceAnimations, renderLoading = () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "..." }), slideDirection, TransitionProps, disablePast, disableFuture, minDate, maxDate, shouldDisableDate, shouldDisableMonth, shouldDisableYear, dayOfWeekFormatter = (date) => adapter.format(date, "weekdayShort").charAt(0).toUpperCase(), hasFocus, onFocusedViewChange, gridLabelId, displayWeekNumber, fixedWeekNumber, timezone } = props;
	const now = useNow(timezone);
	const classes = useUtilityClasses$7(classesProp);
	const isRtl = useRtl();
	const isDateDisabled = useIsDateDisabled({
		shouldDisableDate,
		shouldDisableMonth,
		shouldDisableYear,
		minDate,
		maxDate,
		disablePast,
		disableFuture,
		timezone
	});
	const translations = usePickerTranslations();
	const handleDaySelect = useEventCallback_default((day) => {
		if (readOnly) return;
		onSelectedDaysChange(day);
	});
	const focusDay = (day) => {
		if (!isDateDisabled(day)) {
			onFocusedDayChange(day);
			onFocusedViewChange?.(true);
		}
	};
	const handleKeyDown = useEventCallback_default((event, day) => {
		switch (event.key) {
			case "ArrowUp":
				focusDay(adapter.addDays(day, -7));
				event.preventDefault();
				break;
			case "ArrowDown":
				focusDay(adapter.addDays(day, 7));
				event.preventDefault();
				break;
			case "ArrowLeft": {
				const newFocusedDayDefault = adapter.addDays(day, isRtl ? 1 : -1);
				const nextAvailableMonth = adapter.addMonths(day, isRtl ? 1 : -1);
				focusDay(findClosestEnabledDate({
					adapter,
					date: newFocusedDayDefault,
					minDate: isRtl ? newFocusedDayDefault : adapter.startOfMonth(nextAvailableMonth),
					maxDate: isRtl ? adapter.endOfMonth(nextAvailableMonth) : newFocusedDayDefault,
					isDateDisabled,
					timezone
				}) || newFocusedDayDefault);
				event.preventDefault();
				break;
			}
			case "ArrowRight": {
				const newFocusedDayDefault = adapter.addDays(day, isRtl ? -1 : 1);
				const nextAvailableMonth = adapter.addMonths(day, isRtl ? -1 : 1);
				focusDay(findClosestEnabledDate({
					adapter,
					date: newFocusedDayDefault,
					minDate: isRtl ? adapter.startOfMonth(nextAvailableMonth) : newFocusedDayDefault,
					maxDate: isRtl ? newFocusedDayDefault : adapter.endOfMonth(nextAvailableMonth),
					isDateDisabled,
					timezone
				}) || newFocusedDayDefault);
				event.preventDefault();
				break;
			}
			case "Home":
				focusDay(adapter.startOfWeek(day));
				event.preventDefault();
				break;
			case "End":
				focusDay(adapter.endOfWeek(day));
				event.preventDefault();
				break;
			case "PageUp":
				focusDay(adapter.addMonths(day, 1));
				event.preventDefault();
				break;
			case "PageDown":
				focusDay(adapter.addMonths(day, -1));
				event.preventDefault();
				break;
			case "Enter":
			case " ":
				handleDaySelect(day);
				event.preventDefault();
				break;
			default: break;
		}
	});
	const handleFocus = useEventCallback_default((event, day) => focusDay(day));
	const handleBlur = useEventCallback_default((event, day) => {
		if (focusedDay != null && adapter.isSameDay(focusedDay, day)) onFocusedViewChange?.(false);
	});
	const currentMonthNumber = adapter.getMonth(currentMonth);
	const currentYearNumber = adapter.getYear(currentMonth);
	const validSelectedDays = import_react.useMemo(() => selectedDays.filter((day) => !!day).map((day) => adapter.startOfDay(day)), [adapter, selectedDays]);
	const transitionKey = `${currentYearNumber}-${currentMonthNumber}`;
	const slideNodeRef = import_react.useMemo(() => /* @__PURE__ */ import_react.createRef(), [transitionKey]);
	const weeksToDisplay = import_react.useMemo(() => {
		const toDisplay = adapter.getWeekArray(currentMonth);
		let nextMonth = adapter.addMonths(currentMonth, 1);
		while (fixedWeekNumber && toDisplay.length < fixedWeekNumber) {
			const additionalWeeks = adapter.getWeekArray(nextMonth);
			const hasCommonWeek = adapter.isSameDay(toDisplay[toDisplay.length - 1][0], additionalWeeks[0][0]);
			additionalWeeks.slice(hasCommonWeek ? 1 : 0).forEach((week) => {
				if (toDisplay.length < fixedWeekNumber) toDisplay.push(week);
			});
			nextMonth = adapter.addMonths(nextMonth, 1);
		}
		return toDisplay;
	}, [
		currentMonth,
		fixedWeekNumber,
		adapter
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PickersCalendarDayRoot, {
		role: "grid",
		"aria-labelledby": gridLabelId,
		className: classes.root,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PickersCalendarDayHeader, {
			role: "row",
			className: classes.header,
			children: [displayWeekNumber && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PickersCalendarWeekNumberLabel, {
				variant: "caption",
				role: "columnheader",
				"aria-label": translations.calendarWeekNumberHeaderLabel,
				className: classes.weekNumberLabel,
				children: translations.calendarWeekNumberHeaderText
			}), getWeekdays(adapter, now).map((weekday, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PickersCalendarWeekDayLabel, {
				variant: "caption",
				role: "columnheader",
				"aria-label": adapter.format(weekday, "weekday"),
				className: classes.weekDayLabel,
				children: dayOfWeekFormatter(weekday)
			}, i.toString()))]
		}), loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PickersCalendarLoadingContainer, {
			className: classes.loadingContainer,
			children: renderLoading()
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PickersCalendarSlideTransition, _extends({
			transKey: transitionKey,
			onExited: onMonthSwitchingAnimationEnd,
			reduceAnimations,
			slideDirection,
			className: clsx_default(className, classes.slideTransition)
		}, TransitionProps, {
			nodeRef: slideNodeRef,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PickersCalendarWeekContainer, {
				ref: slideNodeRef,
				role: "rowgroup",
				className: classes.monthContainer,
				children: weeksToDisplay.map((week, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PickersCalendarWeek, {
					role: "row",
					className: classes.weekContainer,
					"aria-rowindex": index + 1,
					children: [displayWeekNumber && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PickersCalendarWeekNumber, {
						className: classes.weekNumber,
						role: "rowheader",
						"aria-label": translations.calendarWeekNumberAriaLabelText(adapter.getWeekNumber(week[0])),
						children: translations.calendarWeekNumberText(adapter.getWeekNumber(week[0]))
					}), week.map((day, dayIndex) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WrappedDay, {
						parentProps: props,
						day,
						selectedDays: validSelectedDays,
						isViewFocused: hasFocus,
						focusedDay,
						onKeyDown: handleKeyDown,
						onFocus: handleFocus,
						onBlur: handleBlur,
						onDaySelect: handleDaySelect,
						isDateDisabled,
						currentMonthNumber,
						"aria-colindex": dayIndex + 1
					}, day.toString()))]
				}, `week-${week[0]}`))
			})
		}))]
	});
}

//#endregion
//#region node_modules/@mui/x-date-pickers/MonthCalendar/monthCalendarClasses.mjs
function getMonthCalendarUtilityClass(slot) {
	return generateUtilityClass("MuiMonthCalendar", slot);
}
const monthCalendarClasses = generateUtilityClasses("MuiMonthCalendar", [
	"root",
	"button",
	"disabled",
	"selected"
]);

//#endregion
//#region node_modules/@mui/x-date-pickers/MonthCalendar/MonthCalendarButton.mjs
var _excluded$6 = [
	"autoFocus",
	"classes",
	"disabled",
	"selected",
	"value",
	"onClick",
	"onKeyDown",
	"onFocus",
	"onBlur",
	"slots",
	"slotProps"
];
var useUtilityClasses$6 = (classes, ownerState) => {
	return composeClasses({ button: [
		"button",
		ownerState.isMonthDisabled && "disabled",
		ownerState.isMonthSelected && "selected"
	] }, getMonthCalendarUtilityClass, classes);
};
var DefaultMonthButton = styled_default("button", {
	name: "MuiMonthCalendar",
	slot: "Button",
	overridesResolver: (_, styles) => [
		styles.button,
		{ [`&.${monthCalendarClasses.disabled}`]: styles.disabled },
		{ [`&.${monthCalendarClasses.selected}`]: styles.selected }
	]
})(({ theme }) => _extends({
	color: "unset",
	backgroundColor: "transparent",
	border: 0,
	outline: 0
}, theme.typography.subtitle1, {
	height: 36,
	width: 72,
	borderRadius: 18,
	cursor: "pointer",
	"&:focus": { backgroundColor: theme.vars ? `rgba(${theme.vars.palette.action.activeChannel} / ${theme.vars.palette.action.hoverOpacity})` : alpha(theme.palette.action.active, theme.palette.action.hoverOpacity) },
	"&:hover": { backgroundColor: theme.vars ? `rgba(${theme.vars.palette.action.activeChannel} / ${theme.vars.palette.action.hoverOpacity})` : alpha(theme.palette.action.active, theme.palette.action.hoverOpacity) },
	"&:disabled": {
		cursor: "auto",
		pointerEvents: "none"
	},
	[`&.${monthCalendarClasses.disabled}`]: { color: (theme.vars || theme).palette.text.secondary },
	[`&.${monthCalendarClasses.selected}`]: {
		color: (theme.vars || theme).palette.primary.contrastText,
		backgroundColor: (theme.vars || theme).palette.primary.main,
		"&:focus, &:hover": { backgroundColor: (theme.vars || theme).palette.primary.dark }
	}
}));
/**
* @ignore - do not document.
*/
const MonthCalendarButton = /* @__PURE__ */ import_react.memo(function MonthCalendarButton$1(props) {
	const { autoFocus, classes: classesProp, disabled, selected, value, onClick, onKeyDown, onFocus, onBlur, slots, slotProps } = props, other = _objectWithoutPropertiesLoose(props, _excluded$6);
	const ref = import_react.useRef(null);
	const { ownerState: pickerOwnerState } = usePickerPrivateContext();
	const ownerState = _extends({}, pickerOwnerState, {
		isMonthDisabled: disabled,
		isMonthSelected: selected
	});
	const classes = useUtilityClasses$6(classesProp, ownerState);
	useEnhancedEffect_default(() => {
		if (autoFocus) ref.current?.focus();
	}, [autoFocus]);
	const MonthButton = slots?.monthButton ?? DefaultMonthButton;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MonthButton, _extends({}, useSlotProps_default({
		elementType: MonthButton,
		externalSlotProps: slotProps?.monthButton,
		externalForwardedProps: other,
		additionalProps: {
			disabled,
			ref,
			type: "button",
			role: "radio",
			"aria-checked": selected,
			onClick: (event) => onClick(event, value),
			onKeyDown: (event) => onKeyDown(event, value),
			onFocus: (event) => onFocus(event, value),
			onBlur: (event) => onBlur(event, value)
		},
		ownerState,
		className: classes.button
	})));
});
MonthCalendarButton.displayName = "MonthCalendarButton";

//#endregion
//#region node_modules/@mui/x-date-pickers/internals/hooks/useControlledValue.mjs
/**
* Hooks controlling the value while making sure that:
* - The value returned by `onChange` always have the timezone of `props.value` or `props.defaultValue` if defined
* - The value rendered is always the one from `props.timezone` if defined
*/
const useControlledValue = ({ name, timezone: timezoneProp, value: valueProp, defaultValue, referenceDate, onChange: onChangeProp, valueManager }) => {
	const adapter = usePickerAdapter();
	const [valueWithInputTimezone, setValue] = useControlled({
		name,
		state: "value",
		controlled: valueProp,
		default: defaultValue ?? valueManager.emptyValue
	});
	const inputTimezone = import_react.useMemo(() => valueManager.getTimezone(adapter, valueWithInputTimezone), [
		adapter,
		valueManager,
		valueWithInputTimezone
	]);
	const setInputTimezone = useEventCallback_default((newValue) => {
		if (inputTimezone == null) return newValue;
		return valueManager.setTimezone(adapter, inputTimezone, newValue);
	});
	const timezoneToRender = import_react.useMemo(() => {
		if (timezoneProp) return timezoneProp;
		if (inputTimezone) return inputTimezone;
		if (referenceDate) return adapter.getTimezone(Array.isArray(referenceDate) ? referenceDate[0] : referenceDate);
		return "default";
	}, [
		timezoneProp,
		inputTimezone,
		referenceDate,
		adapter
	]);
	return {
		value: import_react.useMemo(() => valueManager.setTimezone(adapter, timezoneToRender, valueWithInputTimezone), [
			valueManager,
			adapter,
			timezoneToRender,
			valueWithInputTimezone
		]),
		handleValueChange: useEventCallback_default((newValue, ...otherParams) => {
			const newValueWithInputTimezone = setInputTimezone(newValue);
			setValue(newValueWithInputTimezone);
			onChangeProp?.(newValueWithInputTimezone, ...otherParams);
		}),
		timezone: timezoneToRender
	};
};

//#endregion
//#region node_modules/@mui/x-date-pickers/managers/useDateManager.mjs
function useApplyDefaultValuesToDateValidationProps(props) {
	const adapter = usePickerAdapter();
	const defaultDates = useDefaultDates();
	return import_react.useMemo(() => ({
		disablePast: props.disablePast ?? false,
		disableFuture: props.disableFuture ?? false,
		minDate: applyDefaultDate(adapter, props.minDate, defaultDates.minDate),
		maxDate: applyDefaultDate(adapter, props.maxDate, defaultDates.maxDate)
	}), [
		props.minDate,
		props.maxDate,
		props.disableFuture,
		props.disablePast,
		adapter,
		defaultDates
	]);
}

//#endregion
//#region node_modules/@mui/x-date-pickers/MonthCalendar/MonthCalendar.mjs
var import_prop_types$3 = /* @__PURE__ */ __toESM(require_prop_types(), 1);
var _excluded$5 = [
	"autoFocus",
	"className",
	"currentMonth",
	"classes",
	"value",
	"defaultValue",
	"referenceDate",
	"disabled",
	"disableFuture",
	"disablePast",
	"maxDate",
	"minDate",
	"onChange",
	"shouldDisableMonth",
	"readOnly",
	"disableHighlightToday",
	"onMonthFocus",
	"hasFocus",
	"onFocusedViewChange",
	"monthsPerRow",
	"timezone",
	"gridLabelId",
	"slots",
	"slotProps"
];
var useUtilityClasses$5 = (classes) => {
	return composeClasses({ root: ["root"] }, getMonthCalendarUtilityClass, classes);
};
function useMonthCalendarDefaultizedProps(props, name) {
	const themeProps = useThemeProps({
		props,
		name
	});
	return _extends({}, themeProps, useApplyDefaultValuesToDateValidationProps(themeProps), { monthsPerRow: themeProps.monthsPerRow ?? 3 });
}
var isSameMonth = (monthA, monthB, yearA, yearB, adapter) => Boolean(monthA === monthB && yearB && adapter.isSameYear(yearA, yearB));
var MonthCalendarRoot = styled_default("div", {
	name: "MuiMonthCalendar",
	slot: "Root",
	shouldForwardProp: (prop) => shouldForwardProp(prop) && prop !== "monthsPerRow"
})({
	display: "flex",
	flexWrap: "wrap",
	justifyContent: "space-evenly",
	rowGap: 16,
	padding: "8px 0",
	width: DIALOG_WIDTH,
	boxSizing: "border-box",
	variants: [{
		props: { monthsPerRow: 3 },
		style: { columnGap: 24 }
	}, {
		props: { monthsPerRow: 4 },
		style: { columnGap: 0 }
	}]
});
/**
* Demos:
*
* - [DateCalendar](https://mui.com/x/react-date-pickers/date-calendar/)
*
* API:
*
* - [MonthCalendar API](https://mui.com/x/api/date-pickers/month-calendar/)
*/
const MonthCalendar = /* @__PURE__ */ import_react.forwardRef(function MonthCalendar$1(inProps, ref) {
	const props = useMonthCalendarDefaultizedProps(inProps, "MuiMonthCalendar");
	const { autoFocus, className, currentMonth, classes: classesProp, value: valueProp, defaultValue, referenceDate: referenceDateProp, disabled, disableFuture, disablePast, maxDate, minDate, onChange, shouldDisableMonth, readOnly, onMonthFocus, hasFocus, onFocusedViewChange, monthsPerRow, timezone: timezoneProp, gridLabelId, slots, slotProps } = props, other = _objectWithoutPropertiesLoose(props, _excluded$5);
	const { value, handleValueChange, timezone } = useControlledValue({
		name: "MonthCalendar",
		timezone: timezoneProp,
		value: valueProp,
		defaultValue,
		referenceDate: referenceDateProp,
		onChange,
		valueManager: singleItemValueManager
	});
	const now = useNow(timezone);
	const isRtl = useRtl();
	const adapter = usePickerAdapter();
	const { ownerState } = usePickerPrivateContext();
	const referenceDate = import_react.useMemo(() => singleItemValueManager.getInitialReferenceValue({
		value,
		adapter,
		props,
		timezone,
		referenceDate: referenceDateProp,
		granularity: SECTION_TYPE_GRANULARITY.month
	}), []);
	const classes = useUtilityClasses$5(classesProp);
	const todayMonth = import_react.useMemo(() => adapter.getMonth(now), [adapter, now]);
	const selectedMonth = import_react.useMemo(() => {
		if (value != null) return adapter.getMonth(value);
		return null;
	}, [value, adapter]);
	const [focusedMonth, setFocusedMonth] = import_react.useState(() => selectedMonth || adapter.getMonth(referenceDate));
	const [internalHasFocus, setInternalHasFocus] = useControlled({
		name: "MonthCalendar",
		state: "hasFocus",
		controlled: hasFocus,
		default: autoFocus ?? false
	});
	const changeHasFocus = useEventCallback_default((newHasFocus) => {
		setInternalHasFocus(newHasFocus);
		if (onFocusedViewChange) onFocusedViewChange(newHasFocus);
	});
	const isMonthDisabled = import_react.useCallback((dateToValidate) => {
		const firstEnabledMonth = adapter.startOfMonth(disablePast && adapter.isAfter(now, minDate) ? now : minDate);
		const lastEnabledMonth = adapter.startOfMonth(disableFuture && adapter.isBefore(now, maxDate) ? now : maxDate);
		const monthToValidate = adapter.startOfMonth(dateToValidate);
		if (adapter.isBefore(monthToValidate, firstEnabledMonth)) return true;
		if (adapter.isAfter(monthToValidate, lastEnabledMonth)) return true;
		if (!shouldDisableMonth) return false;
		return shouldDisableMonth(monthToValidate);
	}, [
		disableFuture,
		disablePast,
		maxDate,
		minDate,
		now,
		shouldDisableMonth,
		adapter
	]);
	const handleMonthSelection = useEventCallback_default((_event, month) => {
		if (readOnly) return;
		const baseDateForMonth = (value && currentMonth && !adapter.isSameYear(value, currentMonth) ? adapter.setYear(value, adapter.getYear(currentMonth)) : value) ?? currentMonth ?? referenceDate;
		handleValueChange(adapter.setMonth(baseDateForMonth, month));
	});
	const focusMonth = useEventCallback_default((month) => {
		if (!isMonthDisabled(adapter.setMonth(value ?? currentMonth ?? referenceDate, month))) {
			setFocusedMonth(month);
			changeHasFocus(true);
			if (onMonthFocus) onMonthFocus(month);
		}
	});
	import_react.useEffect(() => {
		setFocusedMonth((prevFocusedMonth) => selectedMonth !== null && prevFocusedMonth !== selectedMonth ? selectedMonth : prevFocusedMonth);
	}, [selectedMonth]);
	const handleKeyDown = useEventCallback_default((event, month) => {
		const monthsInYear = 12;
		const monthsInRow = 3;
		switch (event.key) {
			case "ArrowUp":
				focusMonth((monthsInYear + month - monthsInRow) % monthsInYear);
				event.preventDefault();
				break;
			case "ArrowDown":
				focusMonth((monthsInYear + month + monthsInRow) % monthsInYear);
				event.preventDefault();
				break;
			case "ArrowLeft":
				focusMonth((monthsInYear + month + (isRtl ? 1 : -1)) % monthsInYear);
				event.preventDefault();
				break;
			case "ArrowRight":
				focusMonth((monthsInYear + month + (isRtl ? -1 : 1)) % monthsInYear);
				event.preventDefault();
				break;
			case "Enter":
			case " ":
				handleMonthSelection(event, month);
				event.preventDefault();
				break;
			default: break;
		}
	});
	const handleMonthFocus = useEventCallback_default((event, month) => {
		focusMonth(month);
	});
	const handleMonthBlur = useEventCallback_default((event, month) => {
		if (focusedMonth === month) changeHasFocus(false);
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MonthCalendarRoot, _extends({
		ref,
		className: clsx_default(classes.root, className),
		ownerState,
		role: "radiogroup",
		"aria-labelledby": gridLabelId,
		monthsPerRow
	}, other, { children: getMonthsInYear(adapter, currentMonth ?? value ?? referenceDate).map((month) => {
		const monthNumber = adapter.getMonth(month);
		const monthText = adapter.format(month, "monthShort");
		const monthLabel = adapter.format(month, "month");
		const isSelected = isSameMonth(monthNumber, selectedMonth, month, value, adapter);
		const isDisabled = disabled || isMonthDisabled(month);
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MonthCalendarButton, {
			selected: isSelected,
			value: monthNumber,
			onClick: handleMonthSelection,
			onKeyDown: handleKeyDown,
			autoFocus: internalHasFocus && monthNumber === focusedMonth,
			disabled: isDisabled,
			tabIndex: monthNumber === focusedMonth && !isDisabled ? 0 : -1,
			onFocus: handleMonthFocus,
			onBlur: handleMonthBlur,
			"aria-current": isSameMonth(monthNumber, todayMonth, month, now, adapter) ? "date" : void 0,
			"aria-label": monthLabel,
			slots,
			slotProps,
			classes: classesProp,
			children: monthText
		}, monthText);
	}) }));
});
MonthCalendar.displayName = "MonthCalendar";
MonthCalendar.propTypes = {
	autoFocus: import_prop_types$3.default.bool,
	classes: import_prop_types$3.default.object,
	className: import_prop_types$3.default.string,
	currentMonth: import_prop_types$3.default.object,
	defaultValue: import_prop_types$3.default.object,
	disabled: import_prop_types$3.default.bool,
	disableFuture: import_prop_types$3.default.bool,
	disableHighlightToday: import_prop_types$3.default.bool,
	disablePast: import_prop_types$3.default.bool,
	gridLabelId: import_prop_types$3.default.string,
	hasFocus: import_prop_types$3.default.bool,
	maxDate: import_prop_types$3.default.object,
	minDate: import_prop_types$3.default.object,
	monthsPerRow: import_prop_types$3.default.oneOf([3, 4]),
	onChange: import_prop_types$3.default.func,
	onFocusedViewChange: import_prop_types$3.default.func,
	onMonthFocus: import_prop_types$3.default.func,
	readOnly: import_prop_types$3.default.bool,
	referenceDate: import_prop_types$3.default.object,
	shouldDisableMonth: import_prop_types$3.default.func,
	slotProps: import_prop_types$3.default.object,
	slots: import_prop_types$3.default.object,
	sx: import_prop_types$3.default.oneOfType([
		import_prop_types$3.default.arrayOf(import_prop_types$3.default.oneOfType([
			import_prop_types$3.default.func,
			import_prop_types$3.default.object,
			import_prop_types$3.default.bool
		])),
		import_prop_types$3.default.func,
		import_prop_types$3.default.object
	]),
	timezone: import_prop_types$3.default.string,
	value: import_prop_types$3.default.object
};

//#endregion
//#region node_modules/@mui/x-date-pickers/YearCalendar/yearCalendarClasses.mjs
function getYearCalendarUtilityClass(slot) {
	return generateUtilityClass("MuiYearCalendar", slot);
}
const yearCalendarClasses = generateUtilityClasses("MuiYearCalendar", [
	"root",
	"button",
	"disabled",
	"selected"
]);

//#endregion
//#region node_modules/@mui/x-date-pickers/YearCalendar/YearCalendarButton.mjs
var _excluded$4 = [
	"autoFocus",
	"classes",
	"disabled",
	"selected",
	"value",
	"onClick",
	"onKeyDown",
	"onFocus",
	"onBlur",
	"slots",
	"slotProps"
];
var useUtilityClasses$4 = (classes, ownerState) => {
	return composeClasses({ button: [
		"button",
		ownerState.isYearDisabled && "disabled",
		ownerState.isYearSelected && "selected"
	] }, getYearCalendarUtilityClass, classes);
};
var DefaultYearButton = styled_default("button", {
	name: "MuiYearCalendar",
	slot: "Button",
	overridesResolver: (_, styles) => [
		styles.button,
		{ [`&.${yearCalendarClasses.disabled}`]: styles.disabled },
		{ [`&.${yearCalendarClasses.selected}`]: styles.selected }
	]
})(({ theme }) => _extends({
	color: "unset",
	backgroundColor: "transparent",
	border: 0,
	outline: 0
}, theme.typography.subtitle1, {
	height: 36,
	width: 72,
	borderRadius: 18,
	cursor: "pointer",
	"&:focus": { backgroundColor: theme.vars ? `rgba(${theme.vars.palette.action.activeChannel} / ${theme.vars.palette.action.focusOpacity})` : alpha(theme.palette.action.active, theme.palette.action.focusOpacity) },
	"&:hover": { backgroundColor: theme.vars ? `rgba(${theme.vars.palette.action.activeChannel} / ${theme.vars.palette.action.hoverOpacity})` : alpha(theme.palette.action.active, theme.palette.action.hoverOpacity) },
	"&:disabled": {
		cursor: "auto",
		pointerEvents: "none"
	},
	[`&.${yearCalendarClasses.disabled}`]: { color: (theme.vars || theme).palette.text.secondary },
	[`&.${yearCalendarClasses.selected}`]: {
		color: (theme.vars || theme).palette.primary.contrastText,
		backgroundColor: (theme.vars || theme).palette.primary.main,
		"&:focus, &:hover": { backgroundColor: (theme.vars || theme).palette.primary.dark }
	}
}));
/**
* @ignore - internal component.
*/
const YearCalendarButton = /* @__PURE__ */ import_react.memo(function YearCalendarButton$1(props) {
	const { autoFocus, classes: classesProp, disabled, selected, value, onClick, onKeyDown, onFocus, onBlur, slots, slotProps } = props, other = _objectWithoutPropertiesLoose(props, _excluded$4);
	const ref = import_react.useRef(null);
	const { ownerState: pickerOwnerState } = usePickerPrivateContext();
	const ownerState = _extends({}, pickerOwnerState, {
		isYearDisabled: disabled,
		isYearSelected: selected
	});
	const classes = useUtilityClasses$4(classesProp, ownerState);
	useEnhancedEffect_default(() => {
		if (autoFocus) ref.current?.focus();
	}, [autoFocus]);
	const YearButton = slots?.yearButton ?? DefaultYearButton;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(YearButton, _extends({}, useSlotProps_default({
		elementType: YearButton,
		externalSlotProps: slotProps?.yearButton,
		externalForwardedProps: other,
		additionalProps: {
			disabled,
			ref,
			type: "button",
			role: "radio",
			"aria-checked": selected,
			onClick: (event) => onClick(event, value),
			onKeyDown: (event) => onKeyDown(event, value),
			onFocus: (event) => onFocus(event, value),
			onBlur: (event) => onBlur(event, value)
		},
		ownerState,
		className: classes.button
	})));
});
YearCalendarButton.displayName = "YearCalendarButton";

//#endregion
//#region node_modules/@mui/x-date-pickers/YearCalendar/YearCalendar.mjs
var import_prop_types$2 = /* @__PURE__ */ __toESM(require_prop_types(), 1);
var _excluded$3 = [
	"autoFocus",
	"className",
	"classes",
	"value",
	"defaultValue",
	"referenceDate",
	"disabled",
	"disableFuture",
	"disablePast",
	"maxDate",
	"minDate",
	"onChange",
	"readOnly",
	"shouldDisableYear",
	"disableHighlightToday",
	"onYearFocus",
	"hasFocus",
	"onFocusedViewChange",
	"yearsOrder",
	"yearsPerRow",
	"timezone",
	"gridLabelId",
	"slots",
	"slotProps"
];
var useUtilityClasses$3 = (classes) => {
	return composeClasses({ root: ["root"] }, getYearCalendarUtilityClass, classes);
};
function useYearCalendarDefaultizedProps(props, name) {
	const themeProps = useThemeProps({
		props,
		name
	});
	return _extends({}, themeProps, useApplyDefaultValuesToDateValidationProps(themeProps), {
		yearsPerRow: themeProps.yearsPerRow ?? 3,
		yearsOrder: themeProps.yearsOrder ?? "asc"
	});
}
var YearCalendarRoot = styled_default("div", {
	name: "MuiYearCalendar",
	slot: "Root",
	shouldForwardProp: (prop) => shouldForwardProp(prop) && prop !== "yearsPerRow"
})({
	display: "flex",
	flexWrap: "wrap",
	justifyContent: "space-evenly",
	rowGap: 12,
	padding: "6px 0",
	overflowY: "auto",
	height: "100%",
	width: DIALOG_WIDTH,
	maxHeight: MAX_CALENDAR_HEIGHT,
	boxSizing: "border-box",
	position: "relative",
	variants: [{
		props: { yearsPerRow: 3 },
		style: { columnGap: 24 }
	}, {
		props: { yearsPerRow: 4 },
		style: {
			columnGap: 0,
			padding: "0 2px"
		}
	}]
});
var YearCalendarButtonFiller = styled_default("div", {
	name: "MuiYearCalendar",
	slot: "ButtonFiller"
})({
	height: 36,
	width: 72
});
/**
* Demos:
*
* - [DateCalendar](https://mui.com/x/react-date-pickers/date-calendar/)
*
* API:
*
* - [YearCalendar API](https://mui.com/x/api/date-pickers/year-calendar/)
*/
const YearCalendar = /* @__PURE__ */ import_react.forwardRef(function YearCalendar$1(inProps, ref) {
	const props = useYearCalendarDefaultizedProps(inProps, "MuiYearCalendar");
	const { autoFocus, className, classes: classesProp, value: valueProp, defaultValue, referenceDate: referenceDateProp, disabled, disableFuture, disablePast, maxDate, minDate, onChange, readOnly, shouldDisableYear, onYearFocus, hasFocus, onFocusedViewChange, yearsOrder, yearsPerRow, timezone: timezoneProp, gridLabelId, slots, slotProps } = props, other = _objectWithoutPropertiesLoose(props, _excluded$3);
	const { value, handleValueChange, timezone } = useControlledValue({
		name: "YearCalendar",
		timezone: timezoneProp,
		value: valueProp,
		defaultValue,
		referenceDate: referenceDateProp,
		onChange,
		valueManager: singleItemValueManager
	});
	const now = useNow(timezone);
	const isRtl = useRtl();
	const adapter = usePickerAdapter();
	const { ownerState } = usePickerPrivateContext();
	const referenceDate = import_react.useMemo(() => singleItemValueManager.getInitialReferenceValue({
		value,
		adapter,
		props,
		timezone,
		referenceDate: referenceDateProp,
		granularity: SECTION_TYPE_GRANULARITY.year
	}), []);
	const classes = useUtilityClasses$3(classesProp);
	const todayYear = import_react.useMemo(() => adapter.getYear(now), [adapter, now]);
	const selectedYear = import_react.useMemo(() => {
		if (value != null) return adapter.getYear(value);
		return null;
	}, [value, adapter]);
	const [focusedYear, setFocusedYear] = import_react.useState(() => selectedYear || adapter.getYear(referenceDate));
	const [internalHasFocus, setInternalHasFocus] = useControlled({
		name: "YearCalendar",
		state: "hasFocus",
		controlled: hasFocus,
		default: autoFocus ?? false
	});
	const changeHasFocus = useEventCallback_default((newHasFocus) => {
		setInternalHasFocus(newHasFocus);
		if (onFocusedViewChange) onFocusedViewChange(newHasFocus);
	});
	const isYearDisabled = import_react.useCallback((dateToValidate) => {
		if (disablePast && adapter.isBeforeYear(dateToValidate, now)) return true;
		if (disableFuture && adapter.isAfterYear(dateToValidate, now)) return true;
		if (minDate && adapter.isBeforeYear(dateToValidate, minDate)) return true;
		if (maxDate && adapter.isAfterYear(dateToValidate, maxDate)) return true;
		if (!shouldDisableYear) return false;
		return shouldDisableYear(adapter.startOfYear(dateToValidate));
	}, [
		disableFuture,
		disablePast,
		maxDate,
		minDate,
		now,
		shouldDisableYear,
		adapter
	]);
	const handleYearSelection = useEventCallback_default((_event, year) => {
		if (readOnly) return;
		handleValueChange(adapter.setYear(value ?? referenceDate, year));
	});
	const focusYear = useEventCallback_default((year) => {
		if (!isYearDisabled(adapter.setYear(value ?? referenceDate, year))) {
			setFocusedYear(year);
			changeHasFocus(true);
			onYearFocus?.(year);
		}
	});
	import_react.useEffect(() => {
		setFocusedYear((prevFocusedYear) => selectedYear !== null && prevFocusedYear !== selectedYear ? selectedYear : prevFocusedYear);
	}, [selectedYear]);
	const verticalDirection = yearsOrder !== "desc" ? yearsPerRow * 1 : yearsPerRow * -1;
	const horizontalDirection = isRtl && yearsOrder === "asc" || !isRtl && yearsOrder === "desc" ? -1 : 1;
	const handleKeyDown = useEventCallback_default((event, year) => {
		switch (event.key) {
			case "ArrowUp":
				focusYear(year - verticalDirection);
				event.preventDefault();
				break;
			case "ArrowDown":
				focusYear(year + verticalDirection);
				event.preventDefault();
				break;
			case "ArrowLeft":
				focusYear(year - horizontalDirection);
				event.preventDefault();
				break;
			case "ArrowRight":
				focusYear(year + horizontalDirection);
				event.preventDefault();
				break;
			case "Enter":
			case " ":
				handleYearSelection(event, year);
				event.preventDefault();
				break;
			default: break;
		}
	});
	const handleYearFocus = useEventCallback_default((event, year) => {
		focusYear(year);
	});
	const handleYearBlur = useEventCallback_default((event, year) => {
		if (focusedYear === year) changeHasFocus(false);
	});
	const scrollerRef = import_react.useRef(null);
	const handleRef = useForkRef(ref, scrollerRef);
	import_react.useEffect(() => {
		if (autoFocus || scrollerRef.current === null) return;
		const tabbableButton = scrollerRef.current.querySelector("[tabindex=\"0\"]");
		if (!tabbableButton) return;
		const offsetHeight = tabbableButton.offsetHeight;
		const offsetTop = tabbableButton.offsetTop;
		const clientHeight = scrollerRef.current.clientHeight;
		const scrollTop = scrollerRef.current.scrollTop;
		const elementBottom = offsetTop + offsetHeight;
		if (offsetHeight > clientHeight || offsetTop < scrollTop) return;
		scrollerRef.current.scrollTop = elementBottom - clientHeight / 2 - offsetHeight / 2;
	}, [autoFocus]);
	const yearRange = adapter.getYearRange([minDate, maxDate]);
	if (yearsOrder === "desc") yearRange.reverse();
	let fillerAmount = yearsPerRow - yearRange.length % yearsPerRow;
	if (fillerAmount === yearsPerRow) fillerAmount = 0;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(YearCalendarRoot, _extends({
		ref: handleRef,
		className: clsx_default(classes.root, className),
		ownerState,
		role: "radiogroup",
		"aria-labelledby": gridLabelId,
		yearsPerRow
	}, other, { children: [yearRange.map((year) => {
		const yearNumber = adapter.getYear(year);
		const isSelected = yearNumber === selectedYear;
		const isDisabled = disabled || isYearDisabled(year);
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(YearCalendarButton, {
			selected: isSelected,
			value: yearNumber,
			onClick: handleYearSelection,
			onKeyDown: handleKeyDown,
			autoFocus: internalHasFocus && yearNumber === focusedYear,
			disabled: isDisabled,
			tabIndex: yearNumber === focusedYear && !isDisabled ? 0 : -1,
			onFocus: handleYearFocus,
			onBlur: handleYearBlur,
			"aria-current": todayYear === yearNumber ? "date" : void 0,
			slots,
			slotProps,
			classes: classesProp,
			children: adapter.format(year, "year")
		}, adapter.format(year, "year"));
	}), Array.from({ length: fillerAmount }, (_, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(YearCalendarButtonFiller, {}, index))] }));
});
YearCalendar.displayName = "YearCalendar";
YearCalendar.propTypes = {
	autoFocus: import_prop_types$2.default.bool,
	classes: import_prop_types$2.default.object,
	className: import_prop_types$2.default.string,
	defaultValue: import_prop_types$2.default.object,
	disabled: import_prop_types$2.default.bool,
	disableFuture: import_prop_types$2.default.bool,
	disableHighlightToday: import_prop_types$2.default.bool,
	disablePast: import_prop_types$2.default.bool,
	gridLabelId: import_prop_types$2.default.string,
	hasFocus: import_prop_types$2.default.bool,
	maxDate: import_prop_types$2.default.object,
	minDate: import_prop_types$2.default.object,
	onChange: import_prop_types$2.default.func,
	onFocusedViewChange: import_prop_types$2.default.func,
	onYearFocus: import_prop_types$2.default.func,
	readOnly: import_prop_types$2.default.bool,
	referenceDate: import_prop_types$2.default.object,
	shouldDisableYear: import_prop_types$2.default.func,
	slotProps: import_prop_types$2.default.object,
	slots: import_prop_types$2.default.object,
	sx: import_prop_types$2.default.oneOfType([
		import_prop_types$2.default.arrayOf(import_prop_types$2.default.oneOfType([
			import_prop_types$2.default.func,
			import_prop_types$2.default.object,
			import_prop_types$2.default.bool
		])),
		import_prop_types$2.default.func,
		import_prop_types$2.default.object
	]),
	timezone: import_prop_types$2.default.string,
	value: import_prop_types$2.default.object,
	yearsOrder: import_prop_types$2.default.oneOf(["asc", "desc"]),
	yearsPerRow: import_prop_types$2.default.oneOf([3, 4])
};

//#endregion
//#region node_modules/@mui/x-date-pickers/internals/utils/createStepNavigation.mjs
const DEFAULT_STEP_NAVIGATION = {
	hasNextStep: false,
	hasSeveralSteps: false,
	goToNextStep: () => {},
	areViewsInSameStep: () => true
};

//#endregion
//#region node_modules/@mui/x-date-pickers/internals/hooks/useViews.mjs
var warnedOnceNotValidView = false;
function useViews({ onChange, onViewChange, openTo, view: inView, views, autoFocus, focusedView: inFocusedView, onFocusedViewChange, getStepNavigation }) {
	if (!warnedOnceNotValidView) {
		if (inView != null && !views.includes(inView)) {
			console.warn(`MUI X: \`view="${inView}"\` is not a valid prop.`, `It must be an element of \`views=["${views.join("\", \"")}"]\`.`);
			warnedOnceNotValidView = true;
		}
		if (inView == null && openTo != null && !views.includes(openTo)) {
			console.warn(`MUI X: \`openTo="${openTo}"\` is not a valid prop.`, `It must be an element of \`views=["${views.join("\", \"")}"]\`.`);
			warnedOnceNotValidView = true;
		}
	}
	const previousOpenTo = import_react.useRef(openTo);
	const previousViews = import_react.useRef(views);
	const defaultView = import_react.useRef(views.includes(openTo) ? openTo : views[0]);
	const [view, setView] = useControlled({
		name: "useViews",
		state: "view",
		controlled: inView,
		default: defaultView.current
	});
	const [focusedView, setFocusedView] = useControlled({
		name: "useViews",
		state: "focusedView",
		controlled: inFocusedView,
		default: import_react.useRef(autoFocus ? view : null).current
	});
	const stepNavigation = getStepNavigation ? getStepNavigation({
		setView,
		view,
		defaultView: defaultView.current,
		views
	}) : DEFAULT_STEP_NAVIGATION;
	import_react.useEffect(() => {
		if (previousOpenTo.current && previousOpenTo.current !== openTo || previousViews.current && previousViews.current.some((previousView$1) => !views.includes(previousView$1))) {
			setView(views.includes(openTo) ? openTo : views[0]);
			previousViews.current = views;
			previousOpenTo.current = openTo;
		}
	}, [
		openTo,
		setView,
		view,
		views
	]);
	const viewIndex = views.indexOf(view);
	const previousView = views[viewIndex - 1] ?? null;
	const nextView = views[viewIndex + 1] ?? null;
	const handleFocusedViewChange = useEventCallback_default((viewToFocus, hasFocus) => {
		if (hasFocus) setFocusedView(viewToFocus);
		else setFocusedView((prevFocusedView) => viewToFocus === prevFocusedView ? null : prevFocusedView);
		onFocusedViewChange?.(viewToFocus, hasFocus);
	});
	const handleChangeView = useEventCallback_default((newView) => {
		handleFocusedViewChange(newView, true);
		if (newView === view) return;
		setView(newView);
		if (onViewChange) onViewChange(newView);
	});
	const goToNextView = useEventCallback_default(() => {
		if (nextView) handleChangeView(nextView);
	});
	const setValueAndGoToNextView = useEventCallback_default((value, currentViewSelectionState, selectedView) => {
		const isSelectionFinishedOnCurrentView = currentViewSelectionState === "finish";
		const hasMoreViews = selectedView ? views.indexOf(selectedView) < views.length - 1 : Boolean(nextView);
		onChange(value, isSelectionFinishedOnCurrentView && hasMoreViews ? "partial" : currentViewSelectionState, selectedView);
		let currentView = null;
		if (selectedView != null && selectedView !== view) currentView = selectedView;
		else if (isSelectionFinishedOnCurrentView) currentView = view;
		if (currentView == null) return;
		const viewToNavigateTo = views[views.indexOf(currentView) + 1];
		if (viewToNavigateTo == null || !stepNavigation.areViewsInSameStep(currentView, viewToNavigateTo)) return;
		handleChangeView(viewToNavigateTo);
	});
	return _extends({}, stepNavigation, {
		view,
		setView: handleChangeView,
		focusedView,
		setFocusedView: handleFocusedViewChange,
		nextView,
		previousView,
		defaultView: views.includes(openTo) ? openTo : views[0],
		goToNextView,
		setValueAndGoToNextView
	});
}

//#endregion
//#region node_modules/@mui/x-date-pickers/PickersCalendarHeader/pickersCalendarHeaderClasses.mjs
const getPickersCalendarHeaderUtilityClass = (slot) => generateUtilityClass("MuiPickersCalendarHeader", slot);
const pickersCalendarHeaderClasses = generateUtilityClasses("MuiPickersCalendarHeader", [
	"root",
	"labelContainer",
	"label",
	"switchViewButton",
	"switchViewIcon"
]);

//#endregion
//#region node_modules/@mui/x-date-pickers/icons/index.mjs
/**
* @ignore - internal component.
*/
const ArrowDropDownIcon = createSvgIcon(/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M7 10l5 5 5-5z" }), "ArrowDropDown");
/**
* @ignore - internal component.
*/
const ArrowLeftIcon = createSvgIcon(/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6 1.41-1.41z" }), "ArrowLeft");
/**
* @ignore - internal component.
*/
const ArrowRightIcon = createSvgIcon(/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z" }), "ArrowRight");
/**
* @ignore - internal component.
*/
const CalendarIcon = createSvgIcon(/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M17 12h-5v5h5v-5zM16 1v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2h-1V1h-2zm3 18H5V8h14v11z" }), "Calendar");
/**
* @ignore - internal component.
*/
const ClockIcon = createSvgIcon(/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_react.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M12.5 7H11v6l5.25 3.15.75-1.23-4.5-2.67z" })] }), "Clock");
/**
* @ignore - internal component.
*/
const DateRangeIcon = createSvgIcon(/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M9 11H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2zm2-7h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11z" }), "DateRange");
/**
* @ignore - internal component.
*/
const TimeIcon = createSvgIcon(/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_react.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M12.5 7H11v6l5.25 3.15.75-1.23-4.5-2.67z" })] }), "Time");
/**
* @ignore - internal component.
*/
const ClearIcon = createSvgIcon(/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" }), "Clear");

//#endregion
//#region node_modules/@mui/x-date-pickers/internals/components/PickersArrowSwitcher/pickersArrowSwitcherClasses.mjs
function getPickersArrowSwitcherUtilityClass(slot) {
	return generateUtilityClass("MuiPickersArrowSwitcher", slot);
}
const pickersArrowSwitcherClasses = generateUtilityClasses("MuiPickersArrowSwitcher", [
	"root",
	"spacer",
	"button",
	"previousIconButton",
	"nextIconButton",
	"leftArrowIcon",
	"rightArrowIcon"
]);

//#endregion
//#region node_modules/@mui/x-date-pickers/internals/components/PickersArrowSwitcher/PickersArrowSwitcher.mjs
var _excluded$2 = [
	"children",
	"className",
	"slots",
	"slotProps",
	"isNextDisabled",
	"isNextHidden",
	"onGoToNext",
	"nextLabel",
	"isPreviousDisabled",
	"isPreviousHidden",
	"onGoToPrevious",
	"previousLabel",
	"labelId",
	"classes"
], _excluded2$1 = ["ownerState"], _excluded3 = ["ownerState"];
var PickersArrowSwitcherRoot = styled_default("div", {
	name: "MuiPickersArrowSwitcher",
	slot: "Root"
})({ display: "flex" });
var PickersArrowSwitcherSpacer = styled_default("div", {
	name: "MuiPickersArrowSwitcher",
	slot: "Spacer"
})(({ theme }) => ({ width: theme.spacing(3) }));
var PickersArrowSwitcherButton = styled_default(IconButton_default, {
	name: "MuiPickersArrowSwitcher",
	slot: "Button"
})({ variants: [{
	props: { isButtonHidden: true },
	style: { visibility: "hidden" }
}] });
var useUtilityClasses$2 = (classes) => {
	return composeClasses({
		root: ["root"],
		spacer: ["spacer"],
		button: ["button"],
		previousIconButton: ["previousIconButton"],
		nextIconButton: ["nextIconButton"],
		leftArrowIcon: ["leftArrowIcon"],
		rightArrowIcon: ["rightArrowIcon"]
	}, getPickersArrowSwitcherUtilityClass, classes);
};
const PickersArrowSwitcher = /* @__PURE__ */ import_react.forwardRef(function PickersArrowSwitcher$1(inProps, ref) {
	const isRtl = useRtl();
	const props = useThemeProps({
		props: inProps,
		name: "MuiPickersArrowSwitcher"
	});
	const { children, className, slots, slotProps, isNextDisabled, isNextHidden, onGoToNext, nextLabel, isPreviousDisabled, isPreviousHidden, onGoToPrevious, previousLabel, labelId, classes: classesProp } = props, other = _objectWithoutPropertiesLoose(props, _excluded$2);
	const { ownerState } = usePickerPrivateContext();
	const classes = useUtilityClasses$2(classesProp);
	const nextProps = {
		isDisabled: isNextDisabled,
		isHidden: isNextHidden,
		goTo: onGoToNext,
		label: nextLabel
	};
	const previousProps = {
		isDisabled: isPreviousDisabled,
		isHidden: isPreviousHidden,
		goTo: onGoToPrevious,
		label: previousLabel
	};
	const PreviousIconButton = slots?.previousIconButton ?? PickersArrowSwitcherButton;
	const previousIconButtonProps = useSlotProps_default({
		elementType: PreviousIconButton,
		externalSlotProps: slotProps?.previousIconButton,
		additionalProps: {
			size: "medium",
			title: previousProps.label,
			"aria-label": previousProps.label,
			disabled: previousProps.isDisabled,
			edge: "end",
			onClick: previousProps.goTo
		},
		ownerState: _extends({}, ownerState, { isButtonHidden: previousProps.isHidden ?? false }),
		className: clsx_default(classes.button, classes.previousIconButton)
	});
	const NextIconButton = slots?.nextIconButton ?? PickersArrowSwitcherButton;
	const nextIconButtonProps = useSlotProps_default({
		elementType: NextIconButton,
		externalSlotProps: slotProps?.nextIconButton,
		additionalProps: {
			size: "medium",
			title: nextProps.label,
			"aria-label": nextProps.label,
			disabled: nextProps.isDisabled,
			edge: "start",
			onClick: nextProps.goTo
		},
		ownerState: _extends({}, ownerState, { isButtonHidden: nextProps.isHidden ?? false }),
		className: clsx_default(classes.button, classes.nextIconButton)
	});
	const LeftArrowIcon = slots?.leftArrowIcon ?? ArrowLeftIcon;
	const leftArrowIconProps = _objectWithoutPropertiesLoose(useSlotProps_default({
		elementType: LeftArrowIcon,
		externalSlotProps: slotProps?.leftArrowIcon,
		additionalProps: { fontSize: "inherit" },
		ownerState,
		className: classes.leftArrowIcon
	}), _excluded2$1);
	const RightArrowIcon = slots?.rightArrowIcon ?? ArrowRightIcon;
	const rightArrowIconProps = _objectWithoutPropertiesLoose(useSlotProps_default({
		elementType: RightArrowIcon,
		externalSlotProps: slotProps?.rightArrowIcon,
		additionalProps: { fontSize: "inherit" },
		ownerState,
		className: classes.rightArrowIcon
	}), _excluded3);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PickersArrowSwitcherRoot, _extends({
		ref,
		className: clsx_default(classes.root, className),
		ownerState
	}, other, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PreviousIconButton, _extends({}, previousIconButtonProps, { children: isRtl ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RightArrowIcon, _extends({}, rightArrowIconProps)) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LeftArrowIcon, _extends({}, leftArrowIconProps)) })),
		children ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Typography_default, {
			variant: "subtitle1",
			component: "span",
			id: labelId,
			children
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PickersArrowSwitcherSpacer, {
			className: classes.spacer,
			ownerState
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NextIconButton, _extends({}, nextIconButtonProps, { children: isRtl ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LeftArrowIcon, _extends({}, leftArrowIconProps)) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RightArrowIcon, _extends({}, rightArrowIconProps)) }))
	] }));
});
PickersArrowSwitcher.displayName = "PickersArrowSwitcher";

//#endregion
//#region node_modules/@mui/x-date-pickers/internals/hooks/date-helpers-hooks.mjs
function useNextMonthDisabled(month, { disableFuture, maxDate, timezone }) {
	const adapter = usePickerAdapter();
	return import_react.useMemo(() => {
		const now = adapter.date(void 0, timezone);
		const lastEnabledMonth = adapter.startOfMonth(disableFuture && adapter.isBefore(now, maxDate) ? now : maxDate);
		return !adapter.isAfter(lastEnabledMonth, month);
	}, [
		disableFuture,
		maxDate,
		month,
		adapter,
		timezone
	]);
}
function usePreviousMonthDisabled(month, { disablePast, minDate, timezone }) {
	const adapter = usePickerAdapter();
	return import_react.useMemo(() => {
		const now = adapter.date(void 0, timezone);
		const firstEnabledMonth = adapter.startOfMonth(disablePast && adapter.isAfter(now, minDate) ? now : minDate);
		return !adapter.isBefore(firstEnabledMonth, month);
	}, [
		disablePast,
		minDate,
		month,
		adapter,
		timezone
	]);
}

//#endregion
//#region node_modules/@mui/x-date-pickers/PickersCalendarHeader/PickersCalendarHeader.mjs
var import_prop_types$1 = /* @__PURE__ */ __toESM(require_prop_types(), 1);
var _excluded$1 = [
	"slots",
	"slotProps",
	"currentMonth",
	"disabled",
	"disableFuture",
	"disablePast",
	"maxDate",
	"minDate",
	"onMonthChange",
	"onViewChange",
	"view",
	"reduceAnimations",
	"views",
	"labelId",
	"className",
	"classes",
	"timezone",
	"format"
], _excluded2 = ["ownerState"];
var useUtilityClasses$1 = (classes) => {
	return composeClasses({
		root: ["root"],
		labelContainer: ["labelContainer"],
		label: ["label"],
		switchViewButton: ["switchViewButton"],
		switchViewIcon: ["switchViewIcon"]
	}, getPickersCalendarHeaderUtilityClass, classes);
};
var PickersCalendarHeaderRoot = styled_default("div", {
	name: "MuiPickersCalendarHeader",
	slot: "Root"
})({
	display: "flex",
	alignItems: "center",
	marginTop: 12,
	marginBottom: 4,
	paddingLeft: 24,
	paddingRight: 12,
	maxHeight: 40,
	minHeight: 40
});
var PickersCalendarHeaderLabelContainer = styled_default("div", {
	name: "MuiPickersCalendarHeader",
	slot: "LabelContainer"
})(({ theme }) => _extends({
	display: "flex",
	overflow: "hidden",
	alignItems: "center",
	cursor: "pointer",
	marginRight: "auto"
}, theme.typography.body1, { fontWeight: theme.typography.fontWeightMedium }));
var PickersCalendarHeaderLabel = styled_default("div", {
	name: "MuiPickersCalendarHeader",
	slot: "Label"
})({ marginRight: 6 });
var PickersCalendarHeaderSwitchViewButton = styled_default(IconButton_default, {
	name: "MuiPickersCalendarHeader",
	slot: "SwitchViewButton"
})({
	marginRight: "auto",
	variants: [{
		props: { view: "year" },
		style: { [`.${pickersCalendarHeaderClasses.switchViewIcon}`]: { transform: "rotate(180deg)" } }
	}]
});
var PickersCalendarHeaderSwitchViewIcon = styled_default(ArrowDropDownIcon, {
	name: "MuiPickersCalendarHeader",
	slot: "SwitchViewIcon"
})(({ theme }) => ({
	willChange: "transform",
	transition: theme.transitions.create("transform"),
	transform: "rotate(0deg)"
}));
/**
* Demos:
*
* - [DateCalendar](https://mui.com/x/react-date-pickers/date-calendar/)
* - [DateRangeCalendar](https://mui.com/x/react-date-pickers/date-range-calendar/)
* - [Custom slots and subcomponents](https://mui.com/x/react-date-pickers/custom-components/)
*
* API:
*
* - [PickersCalendarHeader API](https://mui.com/x/api/date-pickers/pickers-calendar-header/)
*/
var PickersCalendarHeader = /* @__PURE__ */ import_react.forwardRef(function PickersCalendarHeader$1(inProps, ref) {
	const translations = usePickerTranslations();
	const adapter = usePickerAdapter();
	const props = useThemeProps({
		props: inProps,
		name: "MuiPickersCalendarHeader"
	});
	const { slots, slotProps, currentMonth: month, disabled, disableFuture, disablePast, maxDate, minDate, onMonthChange, onViewChange, view, reduceAnimations, views, labelId, className, classes: classesProp, timezone, format = `${adapter.formats.month} ${adapter.formats.year}` } = props, other = _objectWithoutPropertiesLoose(props, _excluded$1);
	const { ownerState } = usePickerPrivateContext();
	const classes = useUtilityClasses$1(classesProp);
	const SwitchViewButton = slots?.switchViewButton ?? PickersCalendarHeaderSwitchViewButton;
	const switchViewButtonProps = useSlotProps_default({
		elementType: SwitchViewButton,
		externalSlotProps: slotProps?.switchViewButton,
		additionalProps: {
			size: "small",
			"aria-label": translations.calendarViewSwitchingButtonAriaLabel(view)
		},
		ownerState: _extends({}, ownerState, { view }),
		className: classes.switchViewButton
	});
	const SwitchViewIcon = slots?.switchViewIcon ?? PickersCalendarHeaderSwitchViewIcon;
	const switchViewIconProps = _objectWithoutPropertiesLoose(useSlotProps_default({
		elementType: SwitchViewIcon,
		externalSlotProps: slotProps?.switchViewIcon,
		ownerState,
		className: classes.switchViewIcon
	}), _excluded2);
	const selectNextMonth = () => onMonthChange(adapter.addMonths(month, 1));
	const selectPreviousMonth = () => onMonthChange(adapter.addMonths(month, -1));
	const isNextMonthDisabled = useNextMonthDisabled(month, {
		disableFuture,
		maxDate,
		timezone
	});
	const isPreviousMonthDisabled = usePreviousMonthDisabled(month, {
		disablePast,
		minDate,
		timezone
	});
	const handleToggleView = () => {
		if (views.length === 1 || !onViewChange || disabled) return;
		if (views.length === 2) onViewChange(views.find((el) => el !== view) || views[0]);
		else onViewChange(views[views.indexOf(view) !== 0 ? 0 : 1]);
	};
	if (views.length === 1 && views[0] === "year") return null;
	const label = adapter.formatByString(month, format);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PickersCalendarHeaderRoot, _extends({}, other, {
		ownerState,
		className: clsx_default(classes.root, className),
		ref,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PickersCalendarHeaderLabelContainer, {
			role: "presentation",
			onClick: handleToggleView,
			ownerState,
			"aria-live": "polite",
			className: classes.labelContainer,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PickersFadeTransitionGroup, {
				reduceAnimations,
				transKey: label,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PickersCalendarHeaderLabel, {
					id: labelId,
					ownerState,
					className: classes.label,
					children: label
				})
			}), views.length > 1 && !disabled && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SwitchViewButton, _extends({}, switchViewButtonProps, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SwitchViewIcon, _extends({}, switchViewIconProps)) }))]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Fade_default, {
			in: view === "day",
			appear: !reduceAnimations,
			enter: !reduceAnimations,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PickersArrowSwitcher, {
				slots,
				slotProps,
				onGoToPrevious: selectPreviousMonth,
				isPreviousDisabled: isPreviousMonthDisabled,
				previousLabel: translations.previousMonth,
				onGoToNext: selectNextMonth,
				isNextDisabled: isNextMonthDisabled,
				nextLabel: translations.nextMonth
			})
		})]
	}));
});
PickersCalendarHeader.displayName = "PickersCalendarHeader";
PickersCalendarHeader.propTypes = {
	classes: import_prop_types$1.default.object,
	className: import_prop_types$1.default.string,
	currentMonth: import_prop_types$1.default.object.isRequired,
	disabled: import_prop_types$1.default.bool,
	disableFuture: import_prop_types$1.default.bool,
	disablePast: import_prop_types$1.default.bool,
	format: import_prop_types$1.default.string,
	labelId: import_prop_types$1.default.string,
	maxDate: import_prop_types$1.default.object.isRequired,
	minDate: import_prop_types$1.default.object.isRequired,
	onMonthChange: import_prop_types$1.default.func.isRequired,
	onViewChange: import_prop_types$1.default.func,
	reduceAnimations: import_prop_types$1.default.bool.isRequired,
	slotProps: import_prop_types$1.default.object,
	slots: import_prop_types$1.default.object,
	sx: import_prop_types$1.default.oneOfType([
		import_prop_types$1.default.arrayOf(import_prop_types$1.default.oneOfType([
			import_prop_types$1.default.func,
			import_prop_types$1.default.object,
			import_prop_types$1.default.bool
		])),
		import_prop_types$1.default.func,
		import_prop_types$1.default.object
	]),
	timezone: import_prop_types$1.default.string.isRequired,
	view: import_prop_types$1.default.oneOf([
		"day",
		"month",
		"year"
	]).isRequired,
	views: import_prop_types$1.default.arrayOf(import_prop_types$1.default.oneOf([
		"day",
		"month",
		"year"
	]).isRequired).isRequired
};

//#endregion
//#region node_modules/@mui/x-date-pickers/internals/components/PickerViewRoot/PickerViewRoot.mjs
const PickerViewRoot = styled_default("div", {
	slot: "internal",
	shouldForwardProp: void 0
})({
	overflow: "hidden",
	width: DIALOG_WIDTH,
	maxHeight: VIEW_HEIGHT,
	display: "flex",
	flexDirection: "column",
	margin: "0 auto"
});

//#endregion
//#region node_modules/@mui/x-date-pickers/internals/hooks/useReduceAnimations.mjs
var PREFERS_REDUCED_MOTION = "@media (prefers-reduced-motion: reduce)";
var mobileVersionMatches = typeof navigator !== "undefined" && navigator.userAgent.match(/android\s(\d+)|OS\s(\d+)/i);
var androidVersion = mobileVersionMatches && mobileVersionMatches[1] ? parseInt(mobileVersionMatches[1], 10) : null;
var iOSVersion = mobileVersionMatches && mobileVersionMatches[2] ? parseInt(mobileVersionMatches[2], 10) : null;
const slowAnimationDevices = androidVersion && androidVersion < 10 || iOSVersion && iOSVersion < 13 || false;
function useReduceAnimations(customReduceAnimations) {
	const prefersReduced = useMediaQuery_default(PREFERS_REDUCED_MOTION, { defaultMatches: false });
	if (customReduceAnimations != null) return customReduceAnimations;
	return prefersReduced || slowAnimationDevices;
}

//#endregion
//#region node_modules/@mui/x-date-pickers/DateCalendar/dateCalendarClasses.mjs
const getDateCalendarUtilityClass = (slot) => generateUtilityClass("MuiDateCalendar", slot);
const dateCalendarClasses = generateUtilityClasses("MuiDateCalendar", ["root", "viewTransitionContainer"]);

//#endregion
//#region node_modules/@mui/x-date-pickers/DateCalendar/DateCalendar.mjs
var import_prop_types = /* @__PURE__ */ __toESM(require_prop_types(), 1);
var _excluded = [
	"autoFocus",
	"onViewChange",
	"value",
	"defaultValue",
	"referenceDate",
	"disableFuture",
	"disablePast",
	"onChange",
	"onYearChange",
	"onMonthChange",
	"reduceAnimations",
	"shouldDisableDate",
	"shouldDisableMonth",
	"shouldDisableYear",
	"view",
	"views",
	"openTo",
	"className",
	"classes",
	"disabled",
	"readOnly",
	"minDate",
	"maxDate",
	"disableHighlightToday",
	"focusedView",
	"onFocusedViewChange",
	"showDaysOutsideCurrentMonth",
	"fixedWeekNumber",
	"dayOfWeekFormatter",
	"slots",
	"slotProps",
	"loading",
	"renderLoading",
	"displayWeekNumber",
	"yearsOrder",
	"yearsPerRow",
	"monthsPerRow",
	"timezone"
];
var useUtilityClasses = (classes) => {
	return composeClasses({
		root: ["root"],
		viewTransitionContainer: ["viewTransitionContainer"]
	}, getDateCalendarUtilityClass, classes);
};
function useDateCalendarDefaultizedProps(props, name) {
	const themeProps = useThemeProps({
		props,
		name
	});
	const reduceAnimations = useReduceAnimations(themeProps.reduceAnimations);
	return _extends({}, themeProps, useApplyDefaultValuesToDateValidationProps(themeProps), {
		loading: themeProps.loading ?? false,
		openTo: themeProps.openTo ?? "day",
		views: themeProps.views ?? ["year", "day"],
		reduceAnimations,
		renderLoading: themeProps.renderLoading ?? (() => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "..." }))
	});
}
var DateCalendarRoot = styled_default(PickerViewRoot, {
	name: "MuiDateCalendar",
	slot: "Root"
})({
	display: "flex",
	flexDirection: "column",
	height: VIEW_HEIGHT
});
var DateCalendarViewTransitionContainer = styled_default(PickersFadeTransitionGroup, {
	name: "MuiDateCalendar",
	slot: "ViewTransitionContainer"
})({});
/**
* Demos:
*
* - [DatePicker](https://mui.com/x/react-date-pickers/date-picker/)
* - [DateCalendar](https://mui.com/x/react-date-pickers/date-calendar/)
* - [Validation](https://mui.com/x/react-date-pickers/validation/)
*
* API:
*
* - [DateCalendar API](https://mui.com/x/api/date-pickers/date-calendar/)
*/
const DateCalendar = /* @__PURE__ */ import_react.forwardRef(function DateCalendar$1(inProps, ref) {
	const adapter = usePickerAdapter();
	const { ownerState } = usePickerPrivateContext();
	const id = useId();
	const props = useDateCalendarDefaultizedProps(inProps, "MuiDateCalendar");
	const { autoFocus, onViewChange, value: valueProp, defaultValue, referenceDate: referenceDateProp, disableFuture, disablePast, onChange, onMonthChange, reduceAnimations, shouldDisableDate, shouldDisableMonth, shouldDisableYear, view: inView, views, openTo, className, classes: classesProp, disabled, readOnly, minDate, maxDate, disableHighlightToday, focusedView: focusedViewProp, onFocusedViewChange, showDaysOutsideCurrentMonth, fixedWeekNumber, dayOfWeekFormatter, slots, slotProps, loading, renderLoading, displayWeekNumber, yearsOrder, yearsPerRow, monthsPerRow, timezone: timezoneProp } = props, other = _objectWithoutPropertiesLoose(props, _excluded);
	const { value, handleValueChange, timezone } = useControlledValue({
		name: "DateCalendar",
		timezone: timezoneProp,
		value: valueProp,
		defaultValue,
		referenceDate: referenceDateProp,
		onChange,
		valueManager: singleItemValueManager
	});
	const { view, setView, focusedView, setFocusedView, goToNextView, setValueAndGoToNextView } = useViews({
		view: inView,
		views,
		openTo,
		onChange: handleValueChange,
		onViewChange,
		autoFocus,
		focusedView: focusedViewProp,
		onFocusedViewChange
	});
	const { referenceDate, calendarState, setVisibleDate, isDateDisabled, onMonthSwitchingAnimationEnd } = useCalendarState({
		value,
		referenceDate: referenceDateProp,
		reduceAnimations,
		onMonthChange,
		minDate,
		maxDate,
		shouldDisableDate,
		disablePast,
		disableFuture,
		timezone,
		getCurrentMonthFromVisibleDate: (visibleDate, prevMonth) => {
			if (adapter.isSameMonth(visibleDate, prevMonth)) return prevMonth;
			return adapter.startOfMonth(visibleDate);
		}
	});
	const minDateWithDisabled = disabled && value || minDate;
	const maxDateWithDisabled = disabled && value || maxDate;
	const gridLabelId = `${id}-grid-label`;
	const hasFocus = focusedView !== null;
	const CalendarHeader = slots?.calendarHeader ?? PickersCalendarHeader;
	const calendarHeaderProps = useSlotProps_default({
		elementType: CalendarHeader,
		externalSlotProps: slotProps?.calendarHeader,
		additionalProps: {
			views,
			view,
			currentMonth: calendarState.currentMonth,
			onViewChange: setView,
			onMonthChange: (month) => setVisibleDate({
				target: month,
				reason: "header-navigation"
			}),
			minDate: minDateWithDisabled,
			maxDate: maxDateWithDisabled,
			disabled,
			disablePast,
			disableFuture,
			reduceAnimations,
			timezone,
			labelId: gridLabelId
		},
		ownerState
	});
	const handleDateMonthChange = useEventCallback_default((newDate) => {
		const startOfMonth = adapter.startOfMonth(newDate);
		const endOfMonth = adapter.endOfMonth(newDate);
		const closestEnabledDate = isDateDisabled(newDate) ? findClosestEnabledDate({
			adapter,
			date: newDate,
			minDate: adapter.isBefore(minDate, startOfMonth) ? startOfMonth : minDate,
			maxDate: adapter.isAfter(maxDate, endOfMonth) ? endOfMonth : maxDate,
			disablePast,
			disableFuture,
			isDateDisabled,
			timezone
		}) : newDate;
		if (closestEnabledDate) {
			setValueAndGoToNextView(closestEnabledDate, "finish");
			setVisibleDate({
				target: closestEnabledDate,
				reason: "cell-interaction"
			});
		} else {
			goToNextView();
			setVisibleDate({
				target: startOfMonth,
				reason: "cell-interaction"
			});
		}
	});
	const handleDateYearChange = useEventCallback_default((newDate) => {
		const startOfYear = adapter.startOfYear(newDate);
		const endOfYear = adapter.endOfYear(newDate);
		const closestEnabledDate = isDateDisabled(newDate) ? findClosestEnabledDate({
			adapter,
			date: newDate,
			minDate: adapter.isBefore(minDate, startOfYear) ? startOfYear : minDate,
			maxDate: adapter.isAfter(maxDate, endOfYear) ? endOfYear : maxDate,
			disablePast,
			disableFuture,
			isDateDisabled,
			timezone
		}) : newDate;
		if (closestEnabledDate) {
			setValueAndGoToNextView(closestEnabledDate, "finish");
			setVisibleDate({
				target: closestEnabledDate,
				reason: "cell-interaction"
			});
		} else {
			goToNextView();
			setVisibleDate({
				target: startOfYear,
				reason: "cell-interaction"
			});
		}
	});
	const handleSelectedDayChange = useEventCallback_default((day) => {
		if (day) return handleValueChange(mergeDateAndTime(adapter, day, value ?? referenceDate), "finish", view);
		return handleValueChange(day, "finish", view);
	});
	import_react.useEffect(() => {
		if (adapter.isValid(value)) setVisibleDate({
			target: value,
			reason: "controlled-value-change"
		});
	}, [value]);
	const classes = useUtilityClasses(classesProp);
	const baseDateValidationProps = {
		disablePast,
		disableFuture,
		maxDate,
		minDate
	};
	const commonViewProps = {
		disableHighlightToday,
		readOnly,
		disabled,
		timezone,
		gridLabelId,
		slots,
		slotProps
	};
	const prevOpenViewRef = import_react.useRef(view);
	import_react.useEffect(() => {
		if (prevOpenViewRef.current === view) return;
		if (focusedView === prevOpenViewRef.current) setFocusedView(view, true);
		prevOpenViewRef.current = view;
	}, [
		focusedView,
		setFocusedView,
		view
	]);
	const selectedDays = import_react.useMemo(() => [value], [value]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DateCalendarRoot, _extends({
		ref,
		className: clsx_default(classes.root, className),
		ownerState
	}, other, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CalendarHeader, _extends({}, calendarHeaderProps, {
		slots,
		slotProps
	})), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DateCalendarViewTransitionContainer, {
		reduceAnimations,
		className: classes.viewTransitionContainer,
		transKey: view,
		ownerState,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
			view === "year" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(YearCalendar, _extends({}, baseDateValidationProps, commonViewProps, {
				value,
				onChange: handleDateYearChange,
				shouldDisableYear,
				hasFocus,
				onFocusedViewChange: (isViewFocused) => setFocusedView("year", isViewFocused),
				yearsOrder,
				yearsPerRow,
				referenceDate
			})),
			view === "month" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MonthCalendar, _extends({}, baseDateValidationProps, commonViewProps, {
				currentMonth: calendarState.currentMonth,
				hasFocus,
				className,
				value,
				onChange: handleDateMonthChange,
				shouldDisableMonth,
				onFocusedViewChange: (isViewFocused) => setFocusedView("month", isViewFocused),
				monthsPerRow,
				referenceDate
			})),
			view === "day" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DayCalendar, _extends({}, calendarState, baseDateValidationProps, commonViewProps, {
				onMonthSwitchingAnimationEnd,
				hasFocus,
				onFocusedDayChange: (focusedDate) => setVisibleDate({
					target: focusedDate,
					reason: "cell-interaction"
				}),
				reduceAnimations,
				selectedDays,
				onSelectedDaysChange: handleSelectedDayChange,
				shouldDisableDate,
				shouldDisableMonth,
				shouldDisableYear,
				onFocusedViewChange: (isViewFocused) => setFocusedView("day", isViewFocused),
				showDaysOutsideCurrentMonth,
				fixedWeekNumber,
				dayOfWeekFormatter,
				displayWeekNumber,
				loading,
				renderLoading
			}))
		] })
	})] }));
});
DateCalendar.displayName = "DateCalendar";
DateCalendar.propTypes = {
	autoFocus: import_prop_types.default.bool,
	classes: import_prop_types.default.object,
	className: import_prop_types.default.string,
	dayOfWeekFormatter: import_prop_types.default.func,
	defaultValue: import_prop_types.default.object,
	disabled: import_prop_types.default.bool,
	disableFuture: import_prop_types.default.bool,
	disableHighlightToday: import_prop_types.default.bool,
	disablePast: import_prop_types.default.bool,
	displayWeekNumber: import_prop_types.default.bool,
	fixedWeekNumber: import_prop_types.default.number,
	focusedView: import_prop_types.default.oneOf([
		"day",
		"month",
		"year"
	]),
	loading: import_prop_types.default.bool,
	maxDate: import_prop_types.default.object,
	minDate: import_prop_types.default.object,
	monthsPerRow: import_prop_types.default.oneOf([3, 4]),
	onChange: import_prop_types.default.func,
	onFocusedViewChange: import_prop_types.default.func,
	onMonthChange: import_prop_types.default.func,
	onViewChange: import_prop_types.default.func,
	onYearChange: import_prop_types.default.func,
	openTo: import_prop_types.default.oneOf([
		"day",
		"month",
		"year"
	]),
	readOnly: import_prop_types.default.bool,
	reduceAnimations: import_prop_types.default.bool,
	referenceDate: import_prop_types.default.object,
	renderLoading: import_prop_types.default.func,
	shouldDisableDate: import_prop_types.default.func,
	shouldDisableMonth: import_prop_types.default.func,
	shouldDisableYear: import_prop_types.default.func,
	showDaysOutsideCurrentMonth: import_prop_types.default.bool,
	slotProps: import_prop_types.default.object,
	slots: import_prop_types.default.object,
	sx: import_prop_types.default.oneOfType([
		import_prop_types.default.arrayOf(import_prop_types.default.oneOfType([
			import_prop_types.default.func,
			import_prop_types.default.object,
			import_prop_types.default.bool
		])),
		import_prop_types.default.func,
		import_prop_types.default.object
	]),
	timezone: import_prop_types.default.string,
	value: import_prop_types.default.object,
	view: import_prop_types.default.oneOf([
		"day",
		"month",
		"year"
	]),
	views: import_prop_types.default.arrayOf(import_prop_types.default.oneOf([
		"day",
		"month",
		"year"
	]).isRequired),
	yearsOrder: import_prop_types.default.oneOf(["asc", "desc"]),
	yearsPerRow: import_prop_types.default.oneOf([3, 4])
};

//#endregion
export { DateCalendar, dateCalendarClasses, dayCalendarClasses, getDateCalendarUtilityClass, pickersFadeTransitionGroupClasses, pickersSlideTransitionClasses };
//# sourceMappingURL=@mui_x-date-pickers_DateCalendar.js.map