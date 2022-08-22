import { NextPage } from 'next';
import { Galaxy } from '../../components/Galaxy';
import { Shell } from '../../components/Shell';

const ParticleGalaxy: NextPage = () => {
  return (
    <Shell>
      <div className="w-full" style={{ height: '75vh' }}>
        <Galaxy />
      </div>
    </Shell>
  );
};

export default ParticleGalaxy;
