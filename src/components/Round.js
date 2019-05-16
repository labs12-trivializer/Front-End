import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';



const Round = props => {
  return (
    <div>
      <Link to={`/rounds/${props.round.id}`}>Round {props.index || props.round.number}</Link>
    </div>
  )
}

const mapStateToProps = (state, ownProps) => ({
  round: state.rounds.byId[ownProps.roundId]
});

export default connect(
  mapStateToProps,
  null
)(Round);
