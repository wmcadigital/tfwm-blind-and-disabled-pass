import PropTypes from 'prop-types';

import { TTicket } from 'types/ticket';

export type TProps = {
  ticket: TTicket;
};

export const propTypes = {
  ticket: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    modes: PropTypes.arrayOf(PropTypes.oneOf(['bus', 'rail', 'metro']).isRequired).isRequired,
  }).isRequired,
};
