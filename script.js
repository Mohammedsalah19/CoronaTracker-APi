$(() => {
  dateNow();
});

function dateNow() {
  var DATENOW = new Date($.now());
  $('#dateNow').text(DATENOW);
}

// const promiseA = new Promise((resolve, rejectionFunc) => {
//   setTimeout(function () {
//     var result = GetApiData();
//     resolve(result);
//   }, 250)
// });

// promiseA.then(setTimeout(() => {
//   LoadTatable();
// }, 3500));

(async () => {
  await GetApiData();
  setTimeout(() => {
    LoadTatable();
  }, 1000)
})();

function GetApiData() {
  var recover = null;
  $.getJSON('http://api.coronastatistics.live/all', function (res) {
    console.log(res);
    $("#confirmed").text(res.cases);
    $("#deaths").text(res.deaths);
    $("#recovered").text(res.recovered);

    $.getJSON('http://api.coronastatistics.live/countries', function (data) {
      for (let index = 0; index < data.length; index++) {
        var table = `<tr><td class="text-center">${data[index].country}</td><td class="text-center"> ${data[index].todayCases}</td> <td class="text-center">${data[index].cases} </td> <td class="text-center" style="color:red">${data[index].deaths} </td><td class="text-center" style="color:green">${data[index].recovered}</td><td class="text-center">${data[index].casesPerOneMillion}</td></tr>`
        $('#tblData tbody').append(table);
      }
    });
  });
}

function LoadTatable() {
  $('#tblData').DataTable();
}
