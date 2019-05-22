import * as muiColors from '@material-ui/core/colors';

export default (id, level = 100) => {
  const colors = [];
  Object.keys(muiColors).forEach(
    k => muiColors[k][level] && colors.push(muiColors[k][level])
  );
  return colors[id % (colors.length - 1)];
};
