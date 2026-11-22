import {imageMeta} from '../../../lib/visual/manifest.mjs';
export const GET = () => Response.json(imageMeta, {headers:{'Cache-Control':'public, max-age=300'}});
