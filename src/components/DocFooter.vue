<template>
    <div class="footer">
        <article>
            <header>
                <span class="footer-section__header">Contacts:</span>
            </header>
            <div class="footer-contacts__container footer-contacts-item">
                <span>E-Mail: <a href="mailto:igorhorev@gmail.com" target="_blank">igorhorev@gmail.com</a></span>
                <span>Twitter: <a href="https://twitter.com/IgorHorev" target="_blank">@IgorHorev</a></span>
                <span>Skype: igor.horev</span>
            </div>
        </article>
    </div>
</template>

<script>
export default {
  name: 'DocFooter'
}
</script>

<style scoped>

    a, a:link, a:visited, a:active {
        text-decoration: none;
        color: white;
        border-bottom: 2px solid #888888;
        display: inline-block;
        line-height: 0.85;
    }

.footer {
    flex: 0 0 auto;
    position: absolute;

    width: 100%;
    min-height: 3rem;

    margin-top: 3rem;

    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;

    background-color: #555555;
    color: #DDD;

    font-size: 1rem;
    font-weight: bold;

    padding: 1vmax 0px;
}

.footer-contacts__container {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    justify-content: left;
    align-items: left;

    margin: 1vmax;

    font-weight: normal;
}

.footer-contacts-item {
    text-align: left;
}
</style>
