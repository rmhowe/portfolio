import { NextPage } from 'next';
import { Shell } from '../../components/Shell';
import { Picross } from '../../components/picross';

const PicrossPage: NextPage = () => {
  return (
    <Shell>
      <div className="w-full max-w-2xl mx-auto">
        <Picross />
      </div>
    </Shell>
  );
};

export default PicrossPage;
