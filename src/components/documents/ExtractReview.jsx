import Icon from '../../Icon.jsx';

/**
 * What Aster read out of the file, put back in front of the student —
 * ENR-165's design brief: *"Extraction results shown for review must invite
 * correction rather than approval by default."*
 *
 * Three decisions, and each one is against a reference:
 *
 *   - **Every value is an editable input, already filled in**, not read-only
 *     text with an Approve button beside it
 *     ([QuickBooks](https://mobbin.com/screens/13555932-4086-4811-a214-0deccbce373d)).
 *     A field you can type in invites correction; a sentence with a button
 *     under it invites agreement.
 *   - **The machine's answer is marked as the machine's**, in the mono caption
 *     above the fields
 *     ([Revolut](https://mobbin.com/screens/1180d5ee-a7bc-45f2-bb0f-03a09b51859a)).
 *     A guess that presents itself as a fact has already won the argument.
 *   - **Nothing is decided until she decides it, field by field.** There is no
 *     `Confirm all`, and the submit stays shut while anything is undecided.
 *     This is where we leave QuickBooks, whose Save is live from the first
 *     frame, and refuse
 *     [Mercury](https://mobbin.com/screens/8156ac94-1476-4ca2-801e-89444dd78545)
 *     outright — one Approve for the whole extraction, with the consequence in
 *     a tooltip, is approval by default wearing an extra click.
 *
 * Typing a different value *is* a decision — she corrected it, which is the
 * whole point. Typing the original value back is not, and puts the field back
 * to undecided, because agreeing by accident is the thing being prevented.
 */
export default function ExtractReview({ extract, values, decisions, onChange, onConfirm }) {
  const left = extract.fields.filter((field) => !decisions[field.id]).length;

  return (
    <section className="extract-review" aria-labelledby="extract-title">
      <div className="extract-head">
        <h3 id="extract-title">Check what we read</h3>
        <p className="extract-note">{extract.note}</p>
      </div>

      <ul className="extract-fields">
        {extract.fields.map((field) => {
          const decision = decisions[field.id];
          return (
            <li key={field.id} className={`extract-field ${decision ?? 'open'}`}>
              <label htmlFor={`extract-${field.id}`}>{field.label}</label>

              <div className="extract-control">
                <input
                  id={`extract-${field.id}`}
                  type="text"
                  value={values[field.id]}
                  onChange={(event) => onChange(field, event.target.value)}
                  aria-describedby={`extract-read-${field.id}`}
                />
                {decision === 'right' ? (
                  <span className="extract-verdict right">
                    <Icon name="check" size={14} /> Confirmed
                  </span>
                ) : decision === 'fixed' ? (
                  <span className="extract-verdict fixed">
                    <Icon name="pen" size={14} /> You changed this
                  </span>
                ) : (
                  <button type="button" className="extract-agree" onClick={() => onConfirm(field)}>
                    This is right
                  </button>
                )}
              </div>

              <span className="extract-read" id={`extract-read-${field.id}`}>
                read from your file: {field.read}
              </span>
            </li>
          );
        })}
      </ul>

      <p className="extract-left" role="status">
        {left === 0
          ? 'Every field is decided. Nothing was assumed.'
          : `${left} field${left === 1 ? '' : 's'} still to check. Correct anything that is wrong, or mark it right.`}
      </p>
    </section>
  );
}
