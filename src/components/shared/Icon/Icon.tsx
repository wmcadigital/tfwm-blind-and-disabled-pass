import PropTypes from 'prop-types';

import { TIconProps } from './Icon.types';

// Due to weird Protocol errors with external SVGs the svg use doesn't work well with production builds
// So we Ajax the SVG in with a snippet at the bottom of public/index.html

// Icons can be found at: https://designsystem.wmnetwork.co.uk/styles/icons/

const Icon = ({ className, iconName }: TIconProps) => {
  return (
    <svg className={className}>
      <use xlinkHref={`#wmnds-${iconName}`} href={`#wmnds-${iconName}`} />
    </svg>
  );
};

Icon.propTypes = {
  className: PropTypes.string,
  iconName: PropTypes.string.isRequired,
};

Icon.defaultProps = {
  className: '',
};

export default Icon;
