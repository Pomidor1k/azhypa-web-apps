// Импортируем Express
const express = require('express');
const path = require('path');
var admin = require("firebase-admin");
const functions = require('firebase-functions');

var serviceAccount = require("./serviceAccountKeys.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

// Создаём экземпляр Express
const app = express();

app.use(express.static(__dirname));
app.use(express.json());



// Настраиваем маршруты
app.get('/test_one', (req, res) => {
  // Загружаем файл test_one.html
  res.sendFile(__dirname + '/test_one.html');
});

app.get('/test_two', (req, res) => {
  // Загружаем файл test_two.html
  res.sendFile(__dirname + '/test_two.html');
});





app.get('/admin_panel', (req, res) => {
  // Загружаем файл admin_panel.html
  res.sendFile(__dirname + '/admin_panel.html');
});



const db = admin.firestore()
async function getUserLanguage(userId) {
  // Получить доступ к коллекции users.
  const usersCollection = db.collection("users");

  // Получить документ с именем userId.
  const userDoc = await usersCollection.doc(userId).get();

  // Если документ не существует, вернуть null.
  if (!userDoc.exists) {
      return null;
  }

  // Вернуть значение rate.
  return userDoc.data().userLanguage;
}

async function getUserRate(userId) {
  // Получить доступ к коллекции users.
  const usersCollection = db.collection("users");

  // Получить документ с именем userId.
  const userDoc = await usersCollection.doc(userId).get();

  // Если документ не существует, вернуть null.
  if (!userDoc.exists) {
      return null;
  }

  // Вернуть значение rate.
  return userDoc.data().rate;
}



app.post('/api/getUserLanguage', async (req, res) => {
  const {
    userId
} = req.body;
  const userLanguage = await getUserLanguage(`${userId}`)
  res.json({
    data: userLanguage
  })
})

app.post('/api/addFirstTestPassed', async (req, res) => {
  const {userId, firstTestPassed} = req.body;
  await addFirstTestPassedCurrent(`${userId}`, "firstTestPassed", firstTestPassed)
  await updateFirstTestCount(`${userId}`)
})

app.post('/api/addFirstTestCount', async (req, res) => {
  const {userId} = req.body;
  await updateFirstTestCount(`${userId}`)
})

app.post('/api/addSecondTestCount', async (req, res) => {
  const {userId} = req.body;
  await updateSecondTestCount(`${userId}`)
})

app.post('/api/addSecondTestPassed', async (req, res) => {
  const {userId, secondTestPassed} = req.body;
  await addSecondTestPassedCurrent(`${userId}`, "secondTestPassed", secondTestPassed)
})


async function addFirstTestPassedCurrent(userId, key, value) {
  // Получить доступ к коллекции users.
  const usersCollection = db.collection("users");

  // Создать документ с именем userId.
  const userDoc = usersCollection.doc(userId);

  //Добавить параметр в документ.
  await userDoc.update({
      [key]: value,
  });
}

async function addSecondTestPassedCurrent(userId, key, value) {

  const usersCollection = db.collection("users");


  const userDoc = usersCollection.doc(userId);


  await userDoc.update({
      [key]: value,
  });
}


app.post('/api/getUserRateForVideo', async (req, res) => {
  const {
    userId
} = req.body;
  const userRate = await getUserRate(`${userId}`)
  res.json({
    data: userRate
  })
})


app.get("/video1/:userId", async (req, res) => {
  const user = await db.collection("users").doc(req.params.userId).get();
  if (user.exists) {
      res.sendFile(__dirname + "/video_one.html");
  } else {
      res.status(404).send("User not found");
  }
});

app.get("/video2/:userId", async (req, res) => {
  const user = await db.collection("users").doc(req.params.userId).get();
  if (user.exists) {
      res.sendFile(__dirname + "/video_two.html");
  } else {
      res.status(404).send("User not found");
  }
});

app.get("/video3/:userId", async (req, res) => {
  const user = await db.collection("users").doc(req.params.userId).get();
  if (user.exists) {
      res.sendFile(__dirname + "/video_three.html");
  } else {
      res.status(404).send("User not found");
  }
});




const usersCollection = db.collection("users");
let serverDomain = "https://azhypa-web-apps.onrender.com";

function watchUsersForVideo1RateChange() {
  usersCollection.onSnapshot(snapshot => {
    snapshot.docChanges().forEach(async change => {
      if (change.type === "modified" && change.doc.data().rate !== undefined) {
        const userId = change.doc.id;

        // Создание маршрута для первого видео
        app.get(`/video1/${userId}`, (req, res) => {
          res.sendFile(__dirname + '/video_one.html');
        });

        const firstVideoLink = `${serverDomain}/video1/${userId}`;

        // Обновление или добавление ссылки для соответствующего пользователя в Firestore
        await usersCollection.doc(userId).set({ firstVideoLink }, { merge: true });
      }
    });
  });
}

function watchUsersForVideo2RateChange() {
  usersCollection.onSnapshot(snapshot => {
    snapshot.docChanges().forEach(async change => {
      if (change.type === "modified" && change.doc.data().rate !== undefined) {
        const userId = change.doc.id;

        // Создание маршрута для второго видео
        app.get(`/video2/${userId}`, (req, res) => {
          res.sendFile(__dirname + '/video_two.html');
        });

        const secondVideoLink = `${serverDomain}/video2/${userId}`;

        // Обновление или добавление ссылки для соответствующего пользователя в Firestore
        await usersCollection.doc(userId).set({ secondVideoLink }, { merge: true });
      }
    });
  });
}

function watchUsersForVideo3RateChange() {
  usersCollection.onSnapshot(snapshot => {
    snapshot.docChanges().forEach(async change => {
      if (change.type === "modified" && change.doc.data().rate !== undefined) {
        const userId = change.doc.id;

        // Создание маршрута для третьего видео
        app.get(`/video3/${userId}`, (req, res) => {
          res.sendFile(__dirname + '/video_three.html');
        });

        const thirdVideoLink = `${serverDomain}/video3/${userId}`;

        // Обновление или добавление ссылки для соответствующего пользователя в Firestore
        await usersCollection.doc(userId).set({ thirdVideoLink }, { merge: true });
      }
    });
  });
}

function watchUsersForVideo4BtoARateChange() {
  usersCollection.onSnapshot(snapshot => {
    snapshot.docChanges().forEach(async change => {
      if (change.type === "modified" && change.doc.data().rate !== undefined) {
        const userId = change.doc.id;

        // Создание маршрута для третьего видео
        app.get(`/video4BA/${userId}`, (req, res) => {
          res.sendFile(__dirname + '/video_four_B_A.html');
        });

        const videoFourBtoALink = `${serverDomain}/video4BA/${userId}`;

        // Обновление или добавление ссылки для соответствующего пользователя в Firestore
        await usersCollection.doc(userId).set({ videoFourBtoALink }, { merge: true });
      }
    });
  });
}

function watchUsersForVideo4BtoPRateChange() {
  usersCollection.onSnapshot(snapshot => {
    snapshot.docChanges().forEach(async change => {
      if (change.type === "modified" && change.doc.data().rate !== undefined) {
        const userId = change.doc.id;

        // Создание маршрута для третьего видео
        app.get(`/video4BP/${userId}`, (req, res) => {
          res.sendFile(__dirname + '/video_four_B_P.html');
        });

        const videoFourBtoPLink = `${serverDomain}/video4BP/${userId}`;

        // Обновление или добавление ссылки для соответствующего пользователя в Firestore
        await usersCollection.doc(userId).set({ videoFourBtoPLink }, { merge: true });
      }
    });
  });
}

// Вызов функций
watchUsersForVideo1RateChange();
watchUsersForVideo2RateChange();
watchUsersForVideo3RateChange();
watchUsersForVideo4BtoARateChange();
watchUsersForVideo4BtoPRateChange()


async function updateFirstTestCount(userId) {
  // Получить доступ к коллекции users.
  const usersCollection = db.collection("users");

  // Получить документ с именем userId.
  const userDoc = await usersCollection.doc(userId).get();

  // Если документ не существует, вернуть null.
  if (!userDoc.exists) {
      return null;
  }

  // Получить текущее значение firstTestCount.
  const currentCount = userDoc.data().firstTestCount || 0;

  // Установить новое значение для firstTestCount.
  await usersCollection.doc(userId).update({
      firstTestCount: currentCount + 1
  });

  // Вернуть новое значение для контроля (если необходимо).
  return currentCount + 1;
}

async function updateSecondTestCount(userId) {
  // Получить доступ к коллекции users.
  const usersCollection = db.collection("users");

  // Получить документ с именем userId.
  const userDoc = await usersCollection.doc(userId).get();

  // Если документ не существует, вернуть null.
  if (!userDoc.exists) {
      return null;
  }

  // Получить текущее значение firstTestCount.
  const currentCount = userDoc.data().secondTestCount || 0;

  // Установить новое значение для firstTestCount.
  await usersCollection.doc(userId).update({
      secondTestCount: currentCount + 1
  });

  // Вернуть новое значение для контроля (если необходимо).
  return currentCount + 1;
}





// Запускаем приложение
app.listen(3000, () => {
  // Выводим сообщение в консоль
  console.log('Приложение запущено на порту 3000');
});