import PostTags from './PostTags'
import PostTitle from './PostTitle'
import PostUser from './PostUser'

type DescriptionProps = {
  type: string;
  title: string;
  rules: string[];
  user: string;
  createdAt: Date;
  description: string;
  variantLink: string;
};

const daysLeft = (date: Date) => {
  const date_2 = new Date()
  const difference = date_2.getTime() - date.getTime()
  const totalDays = Math.ceil(difference / (1000 * 3600 * 24))
  return totalDays
}

const GameInfo = (props: DescriptionProps) => (
  <div
    className={'w-full flex flex-col bg-border-light rounded-[12px] shadow-dark p-[20px] gap-[20px]'}
  >
    <div className={'flex flex-col gap-[10px]'}>
      <div className={'flex flex-row items-center justify-between'}>
        <PostTitle type={props.type} title={props.title} />
        <TimeLeft from={props.createdAt} />
      </div>

      <PostTags
        rules={props.rules}
        className="text-secondary"
        iconsClassName="fill-secondary"
      />
    </div>

    <PostUser user={props.user} />

    <div className={'flex flex-col text-[16px] '}>
      <h2 className={'text-secondary font-semibold'}>Description</h2>
      <p>{props.description}</p>
    </div>

    <div className={'flex flex-row justify-end mt-auto'}>
      <LinkToVariant href={props.variantLink} />
    </div>
  </div>
)

const TimeLeft = ({ from }: { from: Date }) => (
  <div className={'items-center'}>
    <span className={'text-[16px]'}>{`${daysLeft(from)} days ago`}</span>
  </div>
)

const LinkToVariant = ({ href }: { href: string }) => (
  <a
    href={href}
    className={'block bg-primary px-[32px] py-[7px] rounded-[3px] text-white font-semibold text-[14px]'}
  >
    Try this variant
  </a>
)

export default GameInfo
