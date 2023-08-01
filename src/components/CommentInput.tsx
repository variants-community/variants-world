const CommentInput = () => (
  <div>
    <textarea
      placeholder={'Please be nice when you chat'}
      rows={4}
      className={'bg-dark border border-[2px] text-[16px] resize-none border-border-dark shadow-light rounded-[12px] w-full bg-dark p-[20px] outline-none'}
    />
    <button
      className={'block bg-primary border border-[2px] border-border-dark rounded-[10px] px-[50px] py-[9px] text-white ml-auto mt-[24px]'}
    >
      Comment
    </button>
  </div>
)

export default CommentInput
