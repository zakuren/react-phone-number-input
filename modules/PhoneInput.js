'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _class2, _temp, _initialiseProps;

// import InputSmart from './InputSmart'


var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _reactLifecyclesCompat = require('react-lifecycles-compat');

var _InputBasic = require('./InputBasic');

var _InputBasic2 = _interopRequireDefault(_InputBasic);

var _Flag = require('./Flag');

var _Flag2 = _interopRequireDefault(_Flag);

var _PropTypes = require('./PropTypes');

var _inputControl = require('./input-control');

var _countries = require('./countries');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// `PureComponent` is only available in React >= 15.3.0.
var PureComponent = _react2.default.PureComponent || _react2.default.Component;

var PhoneNumberInput = (0, _reactLifecyclesCompat.polyfill)(_class = (_temp = _class2 = function (_PureComponent) {
	_inherits(PhoneNumberInput, _PureComponent);

	function PhoneNumberInput(props) {
		_classCallCheck(this, PhoneNumberInput);

		var _this = _possibleConstructorReturn(this, (PhoneNumberInput.__proto__ || Object.getPrototypeOf(PhoneNumberInput)).call(this, props));

		_initialiseProps.call(_this);

		var _this$props = _this.props,
		    value = _this$props.value,
		    country = _this$props.country,
		    countries = _this$props.countries,
		    countryOptions = _this$props.countryOptions,
		    labels = _this$props.labels,
		    international = _this$props.international,
		    metadata = _this$props.metadata;


		if (country) {
			validateCountry(country, metadata);
		}
		if (countries) {
			validateCountries(countries, metadata);
		}
		if (countryOptions) {
			validateCountryOptions(countryOptions, metadata);
		}

		var parsed_number = (0, _inputControl.parsePhoneNumber)(value, metadata);

		var pre_selected_country = (0, _inputControl.getPreSelectedCountry)(parsed_number, country, countries || (0, _countries.getCountryCodes)(labels), international, metadata);

		_this.state = {
			// Workaround for `this.props` inside `getDerivedStateFromProps()`.
			props: _this.props,

			// The country selected.
			country: pre_selected_country,

			// Generate country `<select/>` options.
			country_select_options: generate_country_select_options(_this.props),

			// `parsed_input` state property holds non-formatted user's input.
			// The reason is that there's no way of finding out
			// in which form should `value` be displayed: international or national.
			// E.g. if `value` is `+78005553535` then it could be input
			// by a user both as `8 (800) 555-35-35` and `+7 800 555 35 35`.
			// Hence storing just `value`is not sufficient for correct formatting.
			// E.g. if a user entered `8 (800) 555-35-35`
			// then value is `+78005553535` and `parsed_input` is `88005553535`
			// and if a user entered `+7 800 555 35 35`
			// then value is `+78005553535` and `parsed_input` is `+78005553535`.
			parsed_input: generateParsedInput(value, parsed_number, _this.props),

			// `value` property is duplicated in state.
			// The reason is that `getDerivedStateFromProps()`
			// needs this `value` to compare to the new `value` property
			// to find out if `parsed_input` needs updating:
			// If the `value` property changed externally
			// then it won't be equal to state `value`
			// in which case `parsed_input` and `country` get updated.
			value: value
		};
		return _this;
	}

	_createClass(PhoneNumberInput, [{
		key: 'componentDidUpdate',
		value: function componentDidUpdate(prevProps) {
			var _props = this.props,
			    country = _props.country,
			    countries = _props.countries,
			    countryOptions = _props.countryOptions,
			    metadata = _props.metadata;


			if (country && country !== prevProps.country) {
				validateCountry(country, metadata);
			}
			if (countries && countries !== prevProps.countries) {
				validateCountries(countries, metadata);
			}
			if (countryOptions && countryOptions !== prevProps.countryOptions) {
				validateCountryOptions(countryOptions, metadata);
			}
		}

		// Country `<select/>` `onChange` handler.


		// Phone number `<input/>` `onKeyDown` handler.


		// `<input/>` `onChange` handler.
		// Updates `value` property accordingly.
		// (so that they are kept in sync).
		// `parsed_input` must be a parsed phone number
		// or an empty string.
		// E.g.: `""`, `"+"`, `"+123"`, `"123"`.


		// Toggles the `--focus` CSS class.


		// Toggles the `--focus` CSS class.


		// This `onBlur` interceptor is a workaround for `redux-form`
		// so that it gets the up-to-date `value` in its `onBlur` handler.
		// Without this fix it just gets the actual (raw) input field textual value.
		// E.g. `+7 800 555 35 35` instead of `+78005553535`.
		//
		// A developer is not supposed to pass this `onBlur` property manually.
		// Instead, `redux-form` passes `onBlur` to this component automatically
		// and this component patches that `onBlur` handler (a hacky way but works).
		//


		// When country `<select/>` is toggled.


		// Can be called externally.

	}, {
		key: 'render',
		value: function render() {
			var _props2 = this.props,
			    name = _props2.name,
			    disabled = _props2.disabled,
			    autoComplete = _props2.autoComplete,
			    countrySelectTabIndex = _props2.countrySelectTabIndex,
			    showCountrySelect = _props2.showCountrySelect,
			    style = _props2.style,
			    className = _props2.className,
			    inputClassName = _props2.inputClassName,
			    getInputClassName = _props2.getInputClassName,
			    countrySelectProperties = _props2.countrySelectProperties,
			    error = _props2.error,
			    indicateInvalid = _props2.indicateInvalid,
			    CountrySelectComponent = _props2.countrySelectComponent,
			    InputComponent = _props2.inputComponent,
			    ext = _props2.ext,
			    countries = _props2.countries,
			    countryOptions = _props2.countryOptions,
			    labels = _props2.labels,
			    _ = _props2.country,
			    flags = _props2.flags,
			    flagComponent = _props2.flagComponent,
			    flagsPath = _props2.flagsPath,
			    international = _props2.international,
			    internationalIcon = _props2.internationalIcon,
			    displayInitialValueAsLocalNumber = _props2.displayInitialValueAsLocalNumber,
			    onCountryChange = _props2.onCountryChange,
			    limitMaxLength = _props2.limitMaxLength,
			    locale = _props2.locale,
			    metadata = _props2.metadata,
			    phoneNumberInputProps = _objectWithoutProperties(_props2, ['name', 'disabled', 'autoComplete', 'countrySelectTabIndex', 'showCountrySelect', 'style', 'className', 'inputClassName', 'getInputClassName', 'countrySelectProperties', 'error', 'indicateInvalid', 'countrySelectComponent', 'inputComponent', 'ext', 'countries', 'countryOptions', 'labels', 'country', 'flags', 'flagComponent', 'flagsPath', 'international', 'internationalIcon', 'displayInitialValueAsLocalNumber', 'onCountryChange', 'limitMaxLength', 'locale', 'metadata']);

			var _state = this.state,
			    country = _state.country,
			    hidePhoneInputField = _state.hidePhoneInputField,
			    country_select_options = _state.country_select_options,
			    parsed_input = _state.parsed_input,
			    isFocused = _state.isFocused;

			// const InputComponent = inputComponent || (smartCaret ? InputSmart : InputBasic)

			// Extract `countrySelectProperties` from `this.props`
			// also removing them from `phoneNumberInputProps`.

			var _countrySelectProps = {};
			if (countrySelectProperties) {
				for (var key in countrySelectProperties) {
					if (this.props.hasOwnProperty(key)) {
						_countrySelectProps[countrySelectProperties[key]] = this.props[key];
						delete phoneNumberInputProps[key];
					}
				}
			}

			return _react2.default.createElement(
				'div',
				{
					style: style,
					className: (0, _classnames2.default)('react-phone-number-input', {
						'react-phone-number-input--focus': isFocused,
						'react-phone-number-input--invalid': error && indicateInvalid
					}, className) },
				_react2.default.createElement(
					'div',
					{ className: 'react-phone-number-input__row' },
					showCountrySelect && _react2.default.createElement(CountrySelectComponent, _extends({}, _countrySelectProps, {
						ref: this.storeCountrySelectInstance,
						name: name ? name + '__country' : undefined,
						value: country,
						options: country_select_options,
						onChange: this.onCountryChange,
						onFocus: this._onFocus,
						onBlur: this._onBlur,
						disabled: disabled,
						tabIndex: countrySelectTabIndex,
						hidePhoneInputField: this.hidePhoneInputField,
						focusPhoneInputField: this.focus,
						className: 'react-phone-number-input__country' })),
					!hidePhoneInputField && _react2.default.createElement(InputComponent, _extends({
						type: 'tel',
						name: name
					}, phoneNumberInputProps, {
						ref: this.storePhoneNumberInputInstance,
						metadata: metadata,
						country: country,
						value: parsed_input || '',
						onChange: this.onChange,
						onFocus: this.onFocus,
						onBlur: this.onBlur,
						onKeyDown: this.onPhoneNumberKeyDown,
						disabled: disabled,
						autoComplete: autoComplete,
						className: (0, _classnames2.default)('react-phone-number-input__input', 'react-phone-number-input__phone', {
							'react-phone-number-input__input--disabled': disabled,
							'react-phone-number-input__input--invalid': error && indicateInvalid
						}, inputClassName, getInputClassName && getInputClassName({ disabled: disabled, invalid: error && indicateInvalid })) })),
					ext && !hidePhoneInputField && _react2.default.createElement(
						'label',
						{ className: 'react-phone-number-input__ext' },
						labels.ext,
						_react2.default.cloneElement(ext, {
							type: ext.props.type === undefined ? 'number' : ext.props.type,
							onFocus: this._onFocus,
							onBlur: this._onBlur,
							className: (0, _classnames2.default)('react-phone-number-input__input', 'react-phone-number-input__ext-input', {
								'react-phone-number-input__input--disabled': disabled
							}, inputClassName, getInputClassName && getInputClassName({ disabled: disabled }), ext.props.className)
						})
					)
				),
				error && indicateInvalid && _react2.default.createElement(
					'div',
					{ className: 'react-phone-number-input__error' },
					error
				)
			);
		}
	}], [{
		key: 'getDerivedStateFromProps',
		value: function getDerivedStateFromProps(props, state) {
			var country = state.country,
			    hasChangedCountry = state.hasChangedCountry,
			    value = state.value,
			    _state$props = state.props,
			    old_default_country = _state$props.country,
			    old_value = _state$props.value;
			var metadata = props.metadata,
			    new_default_country = props.country,
			    new_value = props.value;

			// Emulate `prevProps` via `state.props`.

			var new_state = { props: props

				// If `countries` or `labels` or `international` changed
				// then re-generate country `<select/>` options.
			};if (props.countries !== state.props.countries || props.labels !== state.props.labels || props.international !== state.props.international) {
				new_state.country_select_options = generate_country_select_options(props);
			}

			// If the default country changed.
			// (e.g. in case of ajax GeoIP detection after page loaded)
			// then select it but only if the user didn't previously select
			// another country and no phone number has been entered so far.
			// Because if the user has already started inputting a phone number
			// then he's okay with no country being selected at all ("International")
			// and doesn't want to be disturbed, doesn't want his input to be screwed, etc.
			if (new_default_country !== old_default_country && !hasChangedCountry && !value && !new_value) {
				return _extends({}, new_state, {
					country: new_default_country
				});
			}
			// If a new `value` is set externally.
			// (e.g. as a result of an ajax API request
			//  to get user's phone after page loaded)
			// The first part — `new_value !== old_value` —
			// is basically `props.value !== prevProps.value`
			// so it means "if value property was changed externally".
			// The second part — `new_value !== value` —
			// is for ignoring the `getDerivedStateFromProps()` call
			// which happens in `this.onChange()` right after `this.setState()`.
			// If this `getDerivedStateFromProps()` call isn't ignored
			// then the country flag would reset on each input.
			else if (new_value !== old_value && new_value !== value) {
					var parsed_number = (0, _inputControl.parsePhoneNumber)(new_value, metadata);

					return _extends({}, new_state, {
						parsed_input: generateParsedInput(new_value, parsed_number, props),
						value: new_value,
						country: new_value ? parsed_number.country : country
					});
				}

			// Maybe `new_state.country_select_options` changed.
			// In any case, update `prevProps`.
			return new_state;
		}
	}]);

	return PhoneNumberInput;
}(PureComponent), _class2.propTypes = {
	/**
  * Phone number in `E.164` format.
  *
  * Example:
  *
  * `"+12223333333"`
  */
	value: _propTypes2.default.string,

	/**
  * Updates the `value` as the user inputs the phone number.
  */
	onChange: _propTypes2.default.func.isRequired,

	/**
  * Toggles the `--focus` CSS class.
  * @ignore
  */
	onFocus: _propTypes2.default.func,

	/**
  * `onBlur` is usually passed by `redux-form`.
  * @ignore
  */
	onBlur: _propTypes2.default.func,

	/**
  * `onKeyDown` handler (e.g. to handle Enter key press).
  * @ignore
  */
	onKeyDown: _propTypes2.default.func,

	/**
  * Disables both the phone number `<input/>`
  * and the country `<select/>`.
  */
	// (is `false` by default)
	disabled: _propTypes2.default.bool.isRequired,

	/**
  * Sets `autoComplete` property for phone number `<input/>`.
  *
  * Web browser's "autocomplete" feature
  * remembers the phone number being input
  * and can also autofill the `<input/>`
  * with previously remembered phone numbers.
  *
  * https://developers.google.com/web/updates/2015/06/checkout-faster-with-autofill
  *
  * For example, can be used to turn it off:
  *
  * "So when should you use `autocomplete="off"`?
  *  One example is when you've implemented your own version
  *  of autocomplete for search. Another example is any form field
  *  where users will input and submit different kinds of information
  *  where it would not be useful to have the browser remember
  *  what was submitted previously".
  */
	// (is `"tel"` by default)
	autoComplete: _propTypes2.default.string.isRequired,

	/**
  * Set to `true` to show the initial `value` in
  * "national" format rather than "international".
  *
  * For example, if this flag is set to `true`
  * and the initial `value="+12133734253"` is passed
  * then the `<input/>` value will be `"(213) 373-4253"`.
  *
  * By default, this flag is set to `false`,
  * meaning that if the initial `value="+12133734253"` is passed
  * then the `<input/>` value will be `"+1 213 373 4253"`.
  *
  * The reason for such default behaviour is that
  * the newer generation grows up when there are no stationary phones
  * and therefore everyone inputs phone numbers in international format
  * in their smartphones so people gradually get more accustomed to
  * writing phone numbers in international format rather than in local format.
  * Future people won't be using "national" format, only "international".
  */
	// (is `false` by default)
	displayInitialValueAsLocalNumber: _propTypes2.default.bool.isRequired,

	/**
  * The country to be selected by default.
  * For example, can be set after a GeoIP lookup.
  *
  * Example: `"US"`.
  */
	// A two-letter country code ("ISO 3166-1 alpha-2").
	country: _propTypes2.default.string,

	/**
  * If specified, only these countries will be available for selection.
  *
  * Example:
  *
  * `["RU", "UA", "KZ"]`
  */
	countries: _propTypes2.default.arrayOf(_propTypes2.default.string),

	/**
  * Custom country `<select/>` option names.
  *
  * Example:
  *
  * `{ "ZZ": "Международный", RU: "Россия", US: "США", ... }`
  */
	labels: _PropTypes.labels.isRequired,

	/**
  * The base URL path for country flag icons.
  * By default it loads country flag icons from
  * `flag-icon-css` repo github pages website.
  * I imagine someone might want to download
  * those country flag icons and host them
  * on their own servers instead.
  */
	flagsPath: _propTypes2.default.string.isRequired,

	/**
  * Custom country flag icon components.
  * These flags replace the default ones.
  *
  * The shape is an object where keys are country codes
  * and values are flag icon components.
  * Flag icon components receive the same properties
  * as `flagComponent` (see below).
  *
  * Example:
  *
  * `{ "RU": () => <img src="..."/> }`
  *
  * Can be used to replace the default flags
  * with custom ones for certain (or all) countries.
  *
  * Can also be used to bundle `<svg/>` flags instead of `<img/>`s:
  *
  * By default flag icons are inserted as `<img/>`s
  * with their `src` pointed to `flag-icon-css` repo github pages website.
  *
  * There might be some cases
  * (e.g. a standalone "native" app, or an "intranet" web application)
  * when including the full set of `<svg/>` country flags (3 megabytes)
  * is more appropriate than downloading them individually at runtime only if needed.
  *
  * Example:
  *
  * `// Uses <svg/> flags (3 megabytes):`
  *
  * `import flags from 'react-phone-number-input/flags'`
  *
  * `import PhoneInput from 'react-phone-number-input'`
  *
  * `<PhoneInput flags={flags} .../>`
  */
	flags: _propTypes2.default.objectOf(_propTypes2.default.func),

	/**
  * Country flag icon component.
  *
  * Takes properties:
  *
  * * country : string — The country code.
  * * flagsPath : string — The `flagsPath` property (see above).
  * * flags : object — The `flags` property (see above).
  */
	flagComponent: _propTypes2.default.func.isRequired,

	/**
  * Set to `false` to drop the "International" option from country `<select/>`.
  */
	international: _propTypes2.default.bool.isRequired,

	/**
  * Custom "International" country `<select/>` option icon.
  */
	internationalIcon: _propTypes2.default.func.isRequired,

	/**
  * Set to `false` to hide country `<select/>`.
  */
	// (is `true` by default)
	showCountrySelect: _propTypes2.default.bool.isRequired,

	/**
  * HTML `tabindex` attribute for country `<select/>`.
  */
	countrySelectTabIndex: _propTypes2.default.number,

	/**
  * Can be used to place some countries on top of the list of country `<select/>` options.
  *
  * * `"|"` — inserts a separator.
  * * `"..."` — means "the rest of the countries" (can be omitted).
  *
  * Example:
  *
  * `["US", "CA", "AU", "|", "..."]`
  */
	countryOptions: _propTypes2.default.arrayOf(_propTypes2.default.string),

	/**
  * `<Phone/>` component CSS style object.
  */
	style: _propTypes2.default.object,

	/**
  * `<Phone/>` component CSS class.
  */
	className: _propTypes2.default.string,

	/**
  * Phone number `<input/>` CSS class.
  */
	inputClassName: _propTypes2.default.string,

	/**
  * Returns phone number `<input/>` CSS class string.
  * Receives an object of shape `{ disabled : boolean?, invalid : boolean? }`.
  * @ignore
  */
	getInputClassName: _propTypes2.default.func,

	/**
  * Country `<select/>` component.
  *
  * Receives properties:
  *
  * * `name : string?` — HTML `name` attribute.
  * * `value : string?` — The currently selected country code.
  * * `onChange(value : string?)` — Updates the `value`.
  * * `onFocus()` — Is used to toggle the `--focus` CSS class.
  * * `onBlur()` — Is used to toggle the `--focus` CSS class.
  * * `options : object[]` — The list of all selectable countries (including "International") each being an object of shape `{ value : string?, label : string, icon : React.Component }`.
  * * `disabled : boolean?` — HTML `disabled` attribute.
  * * `tabIndex : (number|string)?` — HTML `tabIndex` attribute.
  * * `className : string` — CSS class name.
  */
	//
	// (deprecated)
	// * `hidePhoneInputField(hide : boolean)` — Can be called to show/hide phone input field. Takes `hide : boolean` argument. E.g. `react-responsive-ui` `<Select/>` uses this to hide phone number input when country select is expanded.
	// * `focusPhoneInputField()` — Can be called to manually focus phone input field. E.g. `react-responsive-ui` `<Select/>` uses this to focus phone number input after country selection in a timeout (after the phone input field is no longer hidden).
	//
	countrySelectComponent: _propTypes2.default.func.isRequired,

	/**
  * Phone number `<input/>` component.
  *
  * Receives properties:
  *
  * * `value : string` — The parsed phone number. E.g.: `""`, `"+"`, `"+123"`, `"123"`.
  * * `onChange(value : string)` — Updates the `value`.
  * * `onFocus()` — Is used to toggle the `--focus` CSS class.
  * * `onBlur()` — Is used to toggle the `--focus` CSS class.
  * * `country : string?` — The currently selected country. `undefined` means "International" (no country selected).
  * * `metadata : object` — `libphonenumber-js` metadata.
  * * All other properties should be passed through to the underlying `<input/>`.
  *
  * Must also implement `.focus()` method.
  */
	inputComponent: _propTypes2.default.func.isRequired,

	/**
  * Set to `false` to use `inputComponent={InputBasic}`
  * instead of `input-format`'s `<ReactInput/>`.
  * Is `false` by default.
  */
	// smartCaret : PropTypes.bool.isRequired,

	/**
  * Phone number extension `<input/>` element.
  *
  * Example:
  *
  *	`ext={<input value={...} onChange={...}/>}`
  */
	ext: _propTypes2.default.node,

	/**
  * If set to `true` the phone number input will get trimmed
  * if it exceeds the maximum length for the country.
  */
	limitMaxLength: _propTypes2.default.bool.isRequired,

	/**
  * An error message to show below the phone number `<input/>`. For example, `"Required"`.
  */
	error: _propTypes2.default.string,

	/**
  * The `error` is shown only when `indicateInvalid` is `true`.
  * (which is the default).
  * @deprecated
  * @ignore
  */
	indicateInvalid: _propTypes2.default.bool,

	/**
  * Translation JSON object. See the `locales` directory for examples.
  */
	locale: _propTypes2.default.objectOf(_propTypes2.default.string),

	/**
  * `libphonenumber-js` metadata.
  *
  * Can be used to pass custom `libphonenumber-js` metadata
  * to reduce the overall bundle size for those who compile "custom" metadata.
  */
	metadata: _PropTypes.metadata.isRequired,

	/**
  * A long time ago a person requested an `onCountryChange(country)` event listener.
  * No valid reason was given other than compliance with some legacy code
  * which stored both phone number and country in a database.
  * @see  https://github.com/catamphetamine/react-phone-number-input/issues/128
  */
	onCountryChange: _propTypes2.default.func
}, _class2.defaultProps = {
	/**
  * Not disabled.
  */
	disabled: false,

	/**
  * Show `error` (if passed).
  * @deprecated
  */
	indicateInvalid: true,

	/**
  * Remember (and autofill) the value as a phone number.
  */
	autoComplete: 'tel',

	/**
  * Flag icon component.
  */
	flagComponent: _Flag2.default,

	/**
  * By default use icons from `flag-icon-css` github repo.
  */
	flagsPath: 'https://lipis.github.io/flag-icon-css/flags/4x3/',

	/**
  * Default "International" country `<select/>` option icon (globe).
  */
	// internationalIcon: InternationalIcon,

	/**
  * Phone number `<input/>` component.
  */
	inputComponent: _InputBasic2.default,

	/**
  * Show country `<select/>`.
  */
	showCountrySelect: true,

	/**
  * Don't convert the initially passed phone number `value`
  * to a national phone number for its country.
  * The reason is that the newer generation grows up when
  * there are no stationary phones and therefore everyone inputs
  * phone numbers with a `+` in their smartphones
  * so phone numbers written in international form
  * are gradually being considered more natural than local ones.
  */
	displayInitialValueAsLocalNumber: false,

	/**
  * Set to `false` to use `inputComponent={InputBasic}`
  * instead of `input-format`'s `<ReactInput/>`.
  * Is `false` by default.
  */
	// smartCaret : false,

	/**
  * Whether to add the "International" option
  * to the list of countries.
  */
	international: true,

	/**
  * If set to `true` the phone number input will get trimmed
  * if it exceeds the maximum length for the country.
  */
	limitMaxLength: false
}, _initialiseProps = function _initialiseProps() {
	var _this2 = this;

	this.onCountryChange = function (new_country) {
		var _props3 = _this2.props,
		    metadata = _props3.metadata,
		    onChange = _props3.onChange,
		    onCountryChange = _props3.onCountryChange,
		    displayInitialValueAsLocalNumber = _props3.displayInitialValueAsLocalNumber;
		var _state2 = _this2.state,
		    old_parsed_input = _state2.parsed_input,
		    old_country = _state2.country;

		// After the new `country` has been selected,
		// if the phone number `<input/>` holds any digits
		// then migrate those digits for the new `country`.

		var new_parsed_input = (0, _inputControl.migrateParsedInputForNewCountry)(old_parsed_input, old_country, new_country, metadata, displayInitialValueAsLocalNumber);

		var new_value = (0, _inputControl.e164)(new_parsed_input, new_country, metadata);

		if (onCountryChange) {
			onCountryChange(new_country);
		}

		// Focus phone number `<input/>` upon country selection.
		_this2.focus();

		_this2.setState({
			country: new_country,
			hasChangedCountry: true,
			parsed_input: new_parsed_input,
			value: new_value
		}, function () {
			// Update the new `value` property.
			// Doing it after the `state` has been updated
			// because `onChange()` will trigger `getDerivedStateFromProps()`
			// with the new `value` which will be compared to `state.value` there.
			onChange(new_value);
		});
	};

	this.onPhoneNumberKeyDown = function (event) {
		var onKeyDown = _this2.props.onKeyDown;

		// Actually "Down arrow" key is used for showing "autocomplete" ("autofill") options.
		// (e.g. previously entered phone numbers for `autoComplete="tel"`)
		// so can't hijack "Down arrow" keypress here.
		// // Expand country `<select/>`` on "Down arrow" key press.
		// if (event.keyCode === 40) {
		// 	this.country_select.toggle()
		// }

		if (onKeyDown) {
			onKeyDown(event);
		}
	};

	this.onChange = function (parsed_input) {
		var _props4 = _this2.props,
		    onChange = _props4.onChange,
		    onCountryChange = _props4.onCountryChange,
		    countries = _props4.countries,
		    international = _props4.international,
		    limitMaxLength = _props4.limitMaxLength,
		    metadata = _props4.metadata;
		var country = _this2.state.country;


		if (parsed_input) {
			// If the phone number being input is an international one
			// then tries to derive the country from the phone number.
			// (regardless of whether there's any country currently selected)
			if (parsed_input[0] === '+') {
				var old_country = country;
				country = (0, _inputControl.getCountryForParsedInput)(parsed_input, country, countries, international, metadata);

				if (country !== old_country && onCountryChange) {
					onCountryChange(country);
				}
			}
			// If this `onChange()` event was triggered
			// as a result of selecting "International" country
			// then force-prepend a `+` sign if the phone number
			// `<input/>` value isn't in international format.
			else if (!country) {
					parsed_input = '+' + parsed_input;
				}
		}

		// Trim the input to not exceed the maximum possible number length.
		if (limitMaxLength) {
			parsed_input = (0, _inputControl.trimNumber)(parsed_input, country, metadata);
		}

		// Generate the new `value` property.
		var value = (0, _inputControl.e164)(parsed_input, country, metadata);

		_this2.setState({
			parsed_input: parsed_input,
			value: value,
			country: country
		},
		// Update the new `value` property.
		// Doing it after the `state` has been updated
		// because `onChange()` will trigger `getDerivedStateFromProps()`
		// with the new `value` which will be compared to `state.value` there.
		function () {
			return onChange(value);
		});
	};

	this._onFocus = function () {
		return _this2.setState({ isFocused: true });
	};

	this._onBlur = function () {
		return _this2.setState({ isFocused: false });
	};

	this.onFocus = function (event) {
		var onFocus = _this2.props.onFocus;


		_this2._onFocus();

		if (onFocus) {
			onFocus(event);
		}
	};

	this.onBlur = function (event) {
		var onBlur = _this2.props.onBlur;
		var value = _this2.state.value;


		_this2._onBlur();

		if (!onBlur) {
			return;
		}

		// `event` is React's `SyntheticEvent`.
		// Its `.value` is read-only therefore cloning it.
		var _event = _extends({}, event, {
			target: _extends({}, event.target, {
				value: value
			})

			// For `redux-form` event detection.
			// https://github.com/erikras/redux-form/blob/v5/src/events/isEvent.js
		});_event.stopPropagation = event.stopPropagation;
		_event.preventDefault = event.preventDefault;

		return onBlur(_event);
	};

	this.hidePhoneInputField = function (hide) {
		_this2.setState({
			hidePhoneInputField: hide
		});
	};

	this.focus = function () {
		return _this2.number_input.focus();
	};

	this.storeCountrySelectInstance = function (_) {
		return _this2.country_select = _;
	};

	this.storePhoneNumberInputInstance = function (_) {
		return _this2.number_input = _;
	};
}, _temp)) || _class;

// Generates country `<select/>` options.


exports.default = PhoneNumberInput;
function generate_country_select_options(props) {
	var countries = props.countries,
	    labels = props.labels,
	    international = props.international,
	    countryOptions = props.countryOptions;


	var CountrySelectOptionIcon = createCountrySelectOptionIconComponent(props);

	return transformCountryOptions((0, _inputControl.getCountrySelectOptions)(countries || (0, _countries.getCountryCodes)(labels), labels, international).map(function (_ref) {
		var value = _ref.value,
		    label = _ref.label;
		return {
			value: value,
			label: label,
			icon: CountrySelectOptionIcon
		};
	}), countryOptions);
}

function createCountrySelectOptionIconComponent(props) {
	var flags = props.flags,
	    flagsPath = props.flagsPath,
	    FlagComponent = props.flagComponent,
	    InternationalIcon = props.internationalIcon;


	return function (_ref2) {
		var value = _ref2.value;
		return _react2.default.createElement(
			'div',
			{
				className: (0, _classnames2.default)('react-phone-number-input__icon', {
					'react-phone-number-input__icon--international': value === undefined
				}) },
			value ? _react2.default.createElement(FlagComponent, {
				country: value,
				flags: flags,
				flagsPath: flagsPath }) : _react2.default.createElement(InternationalIcon, null)
		);
	};
}

// Can move some country `<select/>` options
// to the top of the list, for example.
// See `countryOptions` property.
function transformCountryOptions(options, transform) {
	if (!transform) {
		return options;
	}

	var optionsOnTop = [];
	var optionsOnBottom = [];
	var appendTo = optionsOnTop;

	var _loop = function _loop() {
		if (_isArray) {
			if (_i >= _iterator.length) return 'break';
			_ref3 = _iterator[_i++];
		} else {
			_i = _iterator.next();
			if (_i.done) return 'break';
			_ref3 = _i.value;
		}

		var element = _ref3;

		if (element === '|') {
			appendTo.push({ divider: true });
		} else if (element === '...' || element === '…') {
			appendTo = optionsOnBottom;
		} else {
			// Find the position of the option.
			var index = options.indexOf(options.filter(function (option) {
				return option.value === element;
			})[0]);
			// Get the option.
			var option = options[index];
			// Remove the option from its default position.
			options.splice(index, 1);
			// Add the option on top.
			appendTo.push(option);
		}
	};

	for (var _iterator = transform, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
		var _ref3;

		var _ret = _loop();

		if (_ret === 'break') break;
	}

	return optionsOnTop.concat(options).concat(optionsOnBottom);
}

function generateParsedInput(value, parsed_number, props) {
	var displayInitialValueAsLocalNumber = props.displayInitialValueAsLocalNumber,
	    metadata = props.metadata;

	// If the `value` (E.164 phone number)
	// belongs to the currently selected country
	// and `displayInitialValueAsLocalNumber` property is `true`
	// then convert `value` (E.164 phone number)
	// to a local phone number digits.
	// E.g. '+78005553535' -> '88005553535'.

	if (displayInitialValueAsLocalNumber && parsed_number.country) {
		return (0, _inputControl.generateNationalNumberDigits)(parsed_number, metadata);
	}

	return value;
}

function validateCountryOptions(countries, metadata) {
	for (var _iterator2 = countries, _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator]();;) {
		var _ref4;

		if (_isArray2) {
			if (_i2 >= _iterator2.length) break;
			_ref4 = _iterator2[_i2++];
		} else {
			_i2 = _iterator2.next();
			if (_i2.done) break;
			_ref4 = _i2.value;
		}

		var country = _ref4;

		if (country && country !== '|' && country !== '...' && country !== '…') {
			if (!metadata.countries[country]) {
				throwCountryNotFound(country);
			}
		}
	}
}

function validateCountries(countries, metadata) {
	for (var _iterator3 = countries, _isArray3 = Array.isArray(_iterator3), _i3 = 0, _iterator3 = _isArray3 ? _iterator3 : _iterator3[Symbol.iterator]();;) {
		var _ref5;

		if (_isArray3) {
			if (_i3 >= _iterator3.length) break;
			_ref5 = _iterator3[_i3++];
		} else {
			_i3 = _iterator3.next();
			if (_i3.done) break;
			_ref5 = _i3.value;
		}

		var country = _ref5;

		if (!metadata.countries[country]) {
			throwCountryNotFound(country);
		}
	}
}

function validateCountry(country, metadata) {
	if (!metadata.countries[country]) {
		throwCountryNotFound(country);
	}
}

function throwCountryNotFound(country) {
	throw new Error('Country not found: ' + country);
}
//# sourceMappingURL=PhoneInput.js.map