import PropTypes from 'prop-types';

import { TInsetTextProps } from './InsetText.types';

const InsetText = ({ content, classes }: TInsetTextProps) => (
  <div className={`wmnds-col-1 wmnds-inset-text ${classes}`}>{content}</div>
);

InsetText.propTypes = {
  content: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
  classes: PropTypes.string,
};
InsetText.defaultProps = {
  classes: null,
};

export default InsetText;
