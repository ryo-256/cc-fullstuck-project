export default function Event({
  // eslint-disable-next-line react/prop-types
  randomSelectedBooks,
  // eslint-disable-next-line react/prop-types
  handleSubmit,
  // eslint-disable-next-line react/prop-types
  formData,
  // eslint-disable-next-line react/prop-types
  updateFormData
}) {
  return (
    <>
      <div>
        <h1>チャレンジ</h1>
        <div>制限時間以内に本の中から1つのキーワードを選択し入力せよ！</div>
        <div>制限時間 00:05:00</div>
        <img
          className="image"
          // eslint-disable-next-line react/prop-types
          src={randomSelectedBooks.cover_image_url}
        />
      </div>
      <form onSubmit={e => handleSubmit(e)}>
        <div>
          <label>
            キーワード：
            <input
              type="text"
              name="keyword"
              // eslint-disable-next-line react/prop-types
              value={formData.keyword}
              onChange={updateFormData}
            />
          </label>
        </div>
        <div>
          <label>
            選んだ理由：
            <select name="reason" onChange={updateFormData}>
              <option value="default">--選択--</option>
              <option value="新しい発見があったから">
                新しい発見があったから
              </option>
              <option value="心に刺さる言葉だったから">
                心に刺さる言葉だったから
              </option>
              <option value="自分の体験に共感したから">
                自分の体験に共感したから
              </option>
              <option value="言葉の響きが面白かったから">
                言葉の響きが面白かったから
              </option>
              <option value="なんとなく">なんとなく</option>
              <option value="その他">その他</option>
            </select>
          </label>
        </div>
        <div>
          <label>
            自由コメント：
            <textarea
              name="comment"
              // eslint-disable-next-line react/prop-types
              value={formData.comment}
              onChange={updateFormData}
            />
          </label>
        </div>
        <button type="submit">登録する</button>
      </form>
    </>
  );
}
