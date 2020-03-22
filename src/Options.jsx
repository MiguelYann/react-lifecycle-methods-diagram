import React from 'react';
import PropTypes from 'prop-types';
import countryCodeToFlagEmoji from 'country-code-to-flag-emoji';

import './Options.less';

import T from './i18n';
import { supportedReactVersions, isReactVersion } from './propTypes';
import { supportedLocales } from './i18n/i18n';

import languages from './i18n/languages.json';

function findLanguage(locale) {
  const [languageCode] = locale.split('-');

  return (
    languages.find(currentLanguage => currentLanguage.code === locale)
    || languages.find(currentLanguage => currentLanguage.code === languageCode)
  );
}

const locales = supportedLocales
  .sort((a, b) => {
    const languageA = findLanguage(a);
    const languageB = findLanguage(b);

    return languageA.name.localeCompare(languageB.name);
  })
  .map((locale) => {
    const language = findLanguage(locale);

    return {
      label: `${countryCodeToFlagEmoji(locale)} ${language.translated_name || language.name}`,
      value: locale,
    };
  });

function SelectOption({
  onChange,
  options,
  value,
  ...otherProps
}) {
  return (
    <select id="language" onChange={onChange} value={value} {...otherProps}>
      {options.map(option => (
        <option key={option.value || option} value={option.value || option}>
          {option.label || option}
        </option>
      ))}
    </select>
  );
}

SelectOption.propTypes = {
  onChange: PropTypes.func,
  options: PropTypes.arrayOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.string,
    }),
  ])).isRequired,
  value: PropTypes.string,
};

export default function Options({
  advanced,
  locale,
  reactVersion,
  toggleAdvanced,
  toggleLocale,
  toggleReactVersion,
}) {
  return (
    <fieldset className="Options">
      <legend>
        <T>
          Options
        </T>
      </legend>
      <div>
        <input type="checkbox" id="showAdvanced" checked={advanced} onChange={toggleAdvanced} />
        <label htmlFor="showAdvanced">
          <T>
            Show less common lifecycles
          </T>
        </label>
      </div>
      <div>
        <label htmlFor="reactVersion">
          <T>
            React version
          </T>
        </label>
        <SelectOption
          id="reactVersion"
          options={supportedReactVersions.map(value => ({
            label: value === '16.4' ? '^16.4' : value,
            value,
          }))}
          onChange={toggleReactVersion}
          value={reactVersion}
        />
      </div>
      <div>
        <label htmlFor="language">
          <T>
            Language
          </T>
        </label>
        <SelectOption
          id="language"
          options={locales}
          onChange={toggleLocale}
          value={locale}
        />
      </div>
    </fieldset>
  );
}

Options.propTypes = {
  advanced: PropTypes.bool,
  locale: PropTypes.string,
  reactVersion: isReactVersion.isRequired,
  toggleAdvanced: PropTypes.func.isRequired,
  toggleLocale: PropTypes.func.isRequired,
  toggleReactVersion: PropTypes.func.isRequired,
};
