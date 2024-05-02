export const getGlobalData = () => {
    const { Marzipano, bowser, screenfull, APP_DATA: data } = window;
    return { Marzipano, bowser, screenfull, data };
  };
  