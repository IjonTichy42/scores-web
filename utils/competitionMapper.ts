const competitionMapper = (id: number) => {
    switch (id) {
        case 1:
            return "Лига Чемпионов"
        case 2:
            return "Лига Европы"
        case 3:
            return "Лига Конференций"
    }
}

export default competitionMapper
