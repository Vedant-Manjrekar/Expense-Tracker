const formatDate = date => {
  const tarik = new Date(date);
  let month = tarik.getMonth() + 1;
  const year = tarik.getFullYear();
  let day = tarik.getDate();

  // console.log(month.length);

  if (month.length < 2) {
    month = `0${month}`;
  }

  if (day.length < 2) {
    day = `0${day}`;
  }

  let fullDate = `${year}-${month}-${day}`;
  return fullDate;
};

export default formatDate;
