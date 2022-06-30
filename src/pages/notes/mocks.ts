
import { rest } from "msw";

export const notes = [
  {
    "title": "This note is from MSW",
    "markdown": `# Look
    I'm baby ramps selfies woke meggings cornhole, gentrify +1 skateboard tofu. 
    Ennui activated charcoal pug, flannel master cleanse taxidermy microdosing
    single-origin coffee +1 listicle DSA snackwave everyday carry. 
    `,
    "id": 1
  },
  {
    "title": "This also from msw",
    "markdown": `# organic ~artisan~ *synth* bicycle rights
    Live-edge pinterest hot chicken cloud*
    Live-edge pinterest hot chicken cloud bread tilde hammock
    organic artisan synth bicycle rights. Truffaut
     raclette farm-to-table affogato scenester mixtape.
    Portland woke paleo pabst vaporware gentrify hell`,
    "id": 2
  }
]

export const handlers = [
  rest.post(`*/notes`, (req, res, ctx) => {
    return res(ctx.status(201));
  }),
  rest.get(`*/notes`, (eq, res, ctx) => {
      return res(ctx.json(notes));    }
  ),
  rest.get(`*/notes/2`, (eq, res, ctx) => {
      return res(ctx.json(notes[0]))}
  ),
];

export default handlers;