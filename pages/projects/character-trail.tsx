import { NextPage } from 'next';
import { Shell } from '../../components/Shell';
import { BackLink } from '../../components/BackLink';
import { ExternalLink } from '../../components/ExternalLink';
import { PageTitle } from '../../components/PageTitle';

const CharacterTrailPage: NextPage = () => {
  return (
    <Shell>
      <div>
        <BackLink />
        <PageTitle>Character Trail (Sandevistan)</PageTitle>
        <figure>
          <img src="/static/images/character-trail/character-trail.png" />
          <figcaption>The final character trail effect.</figcaption>
        </figure>
        <figure>
          <video controls poster="/static/videos/character-trail-poster.png">
            <source src="/static/videos/character-trail.mp4" type="video/mp4" />
          </video>
          <figcaption>Using the Sandevistan ability in-game.</figcaption>
        </figure>
        <h2>Inspiration</h2>
        <p>
          If you're not familiar with the Cyberpunk universe, the Sandevistan is
          a piece of technology attached to a person's spine that lets them move
          at incredible speed. For the purposes of the game Cyberpunk 2077, and
          the TV series Cyberpunk Edgerunners, this is often represented by the
          main character moving at normal speed while everything else moves in
          slow motion. In the game, the effect is portrayed through a simple
          color tint and fisheye post-processing effect. In the TV series
          however, the world around the user is tinted green while the user
          leaves "echoes" of themself as seen in the image below.
        </p>
        <figure>
          <img src="/static/images/character-trail/edgerunners-1.png" />
          <figcaption>
            David using the Sandevistan and leaving "echoes" behind in Cyberpunk
            Edgerunners.
          </figcaption>
        </figure>
        <p>
          As you can see in the image above, but more clearly in the image
          below, these echoes change colour depending on how long after
          activating the Sandevistan they were created. Ones created immediately
          after are green, and then they shift to blue, purple, red, and yellow
          as use of the Sandevistan goes on. I thought this would make for a
          really interesting visual effect portraying time slowdown so I decided
          to recreate it in Unreal Engine.
        </p>
        <figure>
          <img src="/static/images/character-trail/edgerunners-2.png" />
          <figcaption>The array of colours used for the "echoes".</figcaption>
        </figure>
        <h2>Implementation</h2>
        <p>
          While there's not much out there on this specific Sandevistan effect,
          there are some resources for more generic character trail effects. I
          used{' '}
          <ExternalLink href="https://www.youtube.com/watch?v=mLU0E2kQOh0">
            these
          </ExternalLink>{' '}
          <ExternalLink href="https://www.youtube.com/watch?v=FNjA7wT2MEs">
            two
          </ExternalLink>{' '}
          YouTube videos to get started which gave me some interesting ideas.
          There are a couple of ways you could tackle this depending on the kind
          of effect you're going for and how much control you need over it. One
          graphically intensive way would be to attach a particle system to the
          player which bursts some number of particles sampled from the
          character's mesh every 0.1 odd seconds. This can create some really
          cool effects but you can imagine the performance costs for this
          starting to add up.
        </p>
        <p>
          Instead the approach I went for was to spawn a new instance of a
          blueprint which had a poseable mesh on it, and copy the pose from the
          player character to the blueprint at the point of creation. Then to
          add the colour, use a post-processing material with custom stencil
          values for each "echo" instance. If that doesn't quite make sense then
          read on!
        </p>

        <h3>Creating the "Echoes"</h3>
        <figure>
          <img src="/static/images/character-trail/echo-creation.png" />
          <figcaption>
            The blueprint logic for echo creation and destruction.
          </figcaption>
        </figure>
        <p>
          Hopefully you can see from the above blueprint graph that the echo
          creation and destruction isn't too complex (if you ignore the stencil
          values for now). For creation we simply record the start time of the
          ability, then start a loop using timers that will create a new echo
          every 0.1 seconds until the ability duration is reached. We add each
          new echo to an array so that we can destroy them one by one when the
          effect is finished. We want to stagger the destruction of the echoes
          slightly so that it creates an effect of the echoes "catching up" to
          the player, so we need another timer loop to destroy them one by one
          every 0.01 seconds.
        </p>
        <p>
          As for the logic within the echo itself, it's simply setting a custom
          depth stencil value and copying the pose that the player character is
          in at the point at which it's created.
        </p>
        <figure>
          <img src="/static/images/character-trail/echo-begin-play.png" />
          <figcaption>
            The blueprint logic for the echo itself once it has been created.
          </figcaption>
        </figure>

        <h3>Colouring the "Echoes"</h3>
        <p>
          The echo creation and destruction is relatively straightforward, but
          giving them the right colours is a little more complicated. Again
          there are a couple of routes you could go down here. Firstly, you
          could modify your materials (or your master material if using one) to
          allow a tint parameter which will influence the overall colour of the
          mesh. If your materials are sufficiently complex however, this may
          prove to be quite a difficult task.
        </p>
        <p>
          Thanks to the magic of the custom stencil buffer in Unreal however, we
          can achieve the desired effect using post-processing instead. The way
          this works is that every mesh in the scene can be assigned a custom
          stencil value of 0-255 which can then be read from post-process
          materials. This allows targeting of particular post-process effects to
          particular meshes, which is just what we need! Unfortunately I
          couldn't think of a way to use the same stencil value for all echo
          meshes, so instead I greedily used up 50 of the 255 available values
          for the different echoes that get created. This value can of course be
          tweaked depending on what your other stencil buffer needs are.
        </p>
        <p>
          Referring back to the blueprint graphs from the previous section, we
          can see that each echo is assigned a custom stencil value in the range
          205-255 with echoes created towards the beginning of the ability being
          assigned values closer to 205, and echoes towards the end closer to
          255. Side note: I could have also used values 1-50 instead of 205-255,
          but the latter just makes some of the material maths a bit simpler.
          Now given a range of stencil values, how do we map them onto the
          correct colours? Enter Linear Color Curves!
        </p>
        <figure>
          <img src="/static/images/character-trail/color-curve.png" />
          <figcaption>
            The color curve sampled from screenshots of Cyberpunk Edgerunners.
          </figcaption>
        </figure>
        <p>Blah blah blah</p>

        <figure>
          <img src="/static/images/character-trail/material-echoes.png" />
          <figcaption>
            The color curve sampled from screenshots of Cyberpunk Edgerunners.
          </figcaption>
        </figure>

        <h3>Colouring Everything Else</h3>

        <figure>
          <img src="/static/images/character-trail/material-screen.png" />
          <figcaption>
            The color curve sampled from screenshots of Cyberpunk Edgerunners.
          </figcaption>
        </figure>
      </div>
    </Shell>
  );
};

export default CharacterTrailPage;
