fetch('http://185.244.172.108:8081/v1/outlay-rows/entity/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(response => response.json())
  .then(data => {
    const entityID = data.eID;
    console.log('Созданный ID сущности:', entityID);
    // Сохраните entityID как константу для дальнейшего использования
  })
  .catch(error => console.error('Ошибка:', error));