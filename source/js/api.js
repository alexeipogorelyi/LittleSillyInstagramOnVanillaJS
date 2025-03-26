const getData = async (onSuccess, onError) => {
  try {
    const response = await fetch('https://23.javascript.htmlacademy.pro/kekstagram/data');

    if (!response.ok) {
      throw new Error('При загрузке данных с сервера произошла ошибка запроса');
    }

    const data = await response.json();
    onSuccess(data);
  } catch (err) {
    onError('При загрузке данных с сервера произошла ошибка запроса');
  }
};

const sendData = async (onSuccess, onError, body) => {
  try {
    const response = await fetch('https://23.javascript.htmlacademy.pro/kekstagram',
      {
        method: 'POST',
        body: body,
      },
    );

    if (response.ok) {
      onSuccess();
    } else {
      onError();
    }
  } catch (err) {
    onError();
  }
};

export { getData, sendData };

