import { Icon } from 'components/shared';

import { TProps, propTypes, defaultProps } from './Button.types';
import s from './Button.module.scss';
import './Button.fix.scss';

const Button = ({
  btnClass,
  disabled,
  iconLeft,
  iconRight,
  isActive,
  isFetching,
  onClick,
  text,
  title,
  type,
}: TProps) => {
  return (
    <button
      // eslint-disable-next-line react/button-has-type
      type={type}
      title={title}
      className={`wmnds-btn ${btnClass} ${s.btnFix} ${isActive ? 'wmnds-is--active' : ''} ${
        iconRight ? s.iconRight : ''
      } ${disabled ? 'wmnds-btn--disabled' : ''}`}
      onClick={onClick}
      disabled={disabled}
      aria-label={text}
    >
      {/* If icon left is set then call icon component and inject correct svg */}
      {iconLeft ? <Icon className="wmnds-btn__icon" iconName={iconLeft} /> : null}

      {/* button text will go here, if any */}
      {text}
      {/* <ReplaceTextWithIcon htmlElement={text} /> */}

      {/* If API is fetching show spinner on button */}
      {isFetching ? (
        <div
          className="wmnds-loader wmnds-loader--btn wmnds-btn__icon wmnds-btn__icon--right"
          role="alert"
          aria-live="assertive"
        >
          <p className="wmnds-loader__content">Content is loading...</p>
        </div>
      ) : (
        /* If icon right is set then call icon component and inject correct svg */
        iconRight && (
          <Icon className="wmnds-btn__icon wmnds-btn__icon--right" iconName={iconRight} />
        )
      )}
    </button>
  );
};

Button.propTypes = propTypes;
Button.defaultProps = defaultProps;

export default Button;
