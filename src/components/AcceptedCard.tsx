import Bubbles from './icons/Bubbles'

type AcceptedCardProps = {
  verdict: string;
};

const AcceptedCard = (props: AcceptedCardProps) => (
  <div
    className={'flex flex-row justify-between items-center text-center bg-border-light text-green shadow-dark rounded-[12px]'}
  >
    <Bubbles className="ml-[48px] mt-[45px] mb-[20px] mr-0" />
    <div className={'block w-full'}>
      <h2 className={'text-[40px] font-semibold mt-[16px]'}>Accepted</h2>
      <p className={'text-[16px] font-semibold mt-[7px] mb-[20px] text-center'}>
        {props.verdict}
      </p>
    </div>
    <Bubbles className="mr-[48px] mt-[45px] mb-[20px] miror" />
  </div>
)

export default AcceptedCard
