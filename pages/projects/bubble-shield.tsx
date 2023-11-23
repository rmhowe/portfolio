import { NextPage } from 'next';
import { Shell } from '../../components/Shell';
import { BackLink } from '../../components/BackLink';

const BubbleShieldPage: NextPage = () => {
  return (
    <Shell>
      <div className="w-full max-w-2xl mx-auto">
        <BackLink />
        <h1 className="font-bold text-xl md:text-3xl tracking-tight mb-1">
          Bubble Shield
        </h1>
        <p className="text-gray-200 mb-4">Everyone loves a bubble shield!</p>
        <img
          src="/static/images/bubble-shield.png"
          className="rounded-lg w-full"
        />
        <video controls>
          <source src="/static/videos/bubble-shield.mp4" type="video/mp4" />
        </video>
      </div>
    </Shell>
  );
};

export default BubbleShieldPage;
