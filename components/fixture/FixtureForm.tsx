import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css"
import {useState} from "react";
import {FixtureSave} from "@/types/fixture";

function FixtureForm(props: {hide: () => void, save: (props: FixtureSave) => {}}) {
    const {hide, save} = props
    const [isSaving, setIsSaving] = useState(false)
    const [host, setHost] = useState("")
    const [away, setAway] = useState("")
    const [date, setDate] = useState(new Date())
    const [league, setLeague] = useState("1")
    const [progressApplicable, setProgressApplicable] = useState(false)
    const [code, setCode] = useState("")

    const submitHandler = async () => {
        setIsSaving(true)
        save({host, away, date, league, progressApplicable, code})
        setIsSaving(false)
        hide()
    }

    return (
        <form
            className="p-4 m-8 bg-white rounded-2xl"
            onReset={e => {
                e.preventDefault()
                hide()
            }}
            onSubmit={submitHandler}
        >
            <div className="flex justify-between items-center">
                <label
                    htmlFor="host"
                >Хозяева</label>
                <input
                    autoFocus
                    className="p-2 m-2 border-2 bg-white rounded-2xl"
                    id="host"
                    value={host}
                    onChange={e => setHost(e.currentTarget.value)}
                />
            </div>
            <div className="flex justify-between items-center">
                <label htmlFor="away">Гости</label>
                <input
                    className="p-2 m-2 border-2 bg-white rounded-2xl"
                    id="away"
                    value={away}
                    onChange={e => setAway(e.currentTarget.value)}
                />
            </div>
            <div className="flex justify-between items-center">
                <label htmlFor="date">Время начала</label>
                <DatePicker
                    id="date"
                    className="p-2 border-2 m-2 bg-white rounded-2xl"
                    onChange={(date) => {setDate(date!)}}
                    showTimeInput
                    selected={date}
                    dateFormat="dd.MM.yyyy HH:mm"
                />
            </div>
            <div className="flex justify-between items-center">
                <label htmlFor="league">Турнир</label>
                <select
                    className="p-2 m-2 border-2 bg-white rounded-2xl"
                    id="league"
                    value={league}
                    onChange={e => setLeague(e.currentTarget.value)}
                >
                    <option value="1">
                        Лига Чемпионов
                    </option>
                    <option value="2">
                        Лига Европы
                    </option>
                    <option value="3">
                        Лига Конференций
                    </option>
                </select>
            </div>
            <div>
                <label
                    htmlFor="progressApplicable"
                >
                    Ответный матч
                </label>
                <input
                    id="progressApplicable"
                    className="p-2 m-2 bg-white rounded-2xl"
                    type="checkbox"
                    checked={progressApplicable}
                    onChange={e => setProgressApplicable(e.currentTarget.checked)}
                />
            </div>
            <div className="flex justify-between items-center">
                <label
                    htmlFor="code"
                >Код</label>
                <input
                    className="p-2 m-2 border-2 bg-white rounded-2xl"
                    id="code"
                    value={code}
                    onChange={e => setCode(e.currentTarget.value)}
                />
            </div>
            <div
                className="flex justify-between"
            >
                <button
                    className="p-4 border-2 bg-red-500 text-white rounded-2xl"
                    type="reset"
                    disabled={isSaving}
                >
                    Отмена
                </button>
                <button
                    className="p-4 border-2 bg-white rounded-2xl"
                    type="submit"
                    disabled={isSaving}
                >
                    Сохранить
                </button>
            </div>
        </form>
    )
}

export default FixtureForm
