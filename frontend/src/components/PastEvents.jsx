// eslint-disable-next-line react/prop-types
export default function PastEvents({ selectedBooks, selectedEvents }) {
  return (
    <>
      <div>
        <h1>過去のチャレンジ</h1>
        <img
          className="image"
          // eslint-disable-next-line react/prop-types
          src={selectedBooks.cover_image_url}
        />
      </div>
      {// eslint-disable-next-line react/prop-types
      selectedEvents.map(event => {
        const date = new Date(Date.parse(event.date_added));
        const [year, month, day, hour, minutes, seconds] = [
          date.getFullYear(),
          date.getMonth(),
          date.getDate(),
          date.getHours(),
          date.getMinutes(),
          date.getSeconds()
        ];
        const date_string = `${year}/${month}/${day} ${hour}:${minutes}:${seconds}`;
        return (
          <div key={event.id}>
            <table>
              <caption>{date_string}</caption>
              <tr>
                <th>キーワード</th>
                <th>{JSON.parse(event.eventData_json).keyword}</th>
              </tr>
              <tr>
                <th>選んだ理由</th>
                <th>{JSON.parse(event.eventData_json).reason}</th>
              </tr>
              <tr>
                <th>コメント</th>
                <th>{JSON.parse(event.eventData_json).comment}</th>
              </tr>
            </table>
          </div>
        );
      })}
    </>
  );
}
