import PropTypes from 'prop-types';

import { Icon } from 'components/shared';

import { TMessageProps } from './Message.types';

const Message = ({
  type = 'info',
  title,
  content,
  dismissable = false,
  classes,
}: TMessageProps) => {
  let iconName;
  switch (type) {
    case 'success':
      iconName = 'general-success';
      break;
    case 'success-fill':
      iconName = 'general-success';
      break;
    case 'success-fill-no-icon':
      iconName = '';
      break;
    case 'warning':
      iconName = 'general-warning-circle';
      break;
    case 'error':
      iconName = 'general-warning-triangle';
      break;
    default:
      iconName = `general-${type}`;
      break;
  }

  return (
    <div className={`wmnds-msg-summary wmnds-msg-summary--${type} wmnds-m-b-md ${classes}`}>
      {dismissable && (
        <button className="wmnds-msg-summary__close wmnds-link" type="button">
          Close
          <Icon iconName="general-cross" />
        </button>
      )}
      <div className="wmnds-msg-summary__header">
        {iconName && <Icon className="wmnds-msg-summary__icon" iconName={iconName} />}
        <h3 className="wmnds-msg-summary__title">{title}</h3>
      </div>
      <div className={`wmnds-msg-summary__info ${!iconName ? 'wmnds-p-none' : ''}`}>{content}</div>
    </div>
  );
};

Message.propTypes = {
  type: PropTypes.oneOf([
    'info',
    'success',
    'success-fill',
    'success-fill-no-icon',
    'warning',
    'error',
  ]),
  title: PropTypes.string,
  content: PropTypes.element,
  dismissable: PropTypes.bool,
  classes: PropTypes.string,
};

export default Message;
