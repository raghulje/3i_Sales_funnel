import { now, run } from '../db/index.js'

export async function logAction(opts: {
  userId?: number | null
  actionType: string
  itemType?: string | null
  itemId?: string | number | null
  note?: string | null
}) {
  try {
    await run(
      `INSERT INTO action_logs (user_id, action_type, item_type, item_id, note, created_at)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [
        opts.userId ?? null,
        opts.actionType,
        opts.itemType ?? null,
        opts.itemId != null ? String(opts.itemId) : null,
        opts.note ?? null,
        now(),
      ],
    )
  } catch (e) {
    console.warn('[actionLog]', e instanceof Error ? e.message : e)
  }
}
