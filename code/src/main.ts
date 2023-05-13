import { createPatch, CommonPaths } from 'quickentity-script'
import { mkdir } from 'fs/promises'
import path from 'path'

async function savePatch(patch: any, name: string, chunk: number = 0) {
	const chunkFolder = path.join('..', 'content', `chunk${chunk}`)

	await mkdir(chunkFolder, { recursive: true })
	await patch.save(path.join(chunkFolder, `${name}.entity.patch.json`))
}

async function createMainPatch() {
	const patch = createPatch(CommonPaths.Safehouse)
	const door = patch.getEntity('ca130857153cc016')
	const root = door.addChild({ name: 'Kitchen Door Open [MOD]', ...CommonPaths.Entity })

	root.addOnGameStartListener({ OpenDoor: door })

	await savePatch(patch, 'safehouse', 29)
}

async function main() {
	console.log('Making main patch...')
	await createMainPatch()
	console.log('Done.')
}

main()
