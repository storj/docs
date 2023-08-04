export default function Test() {
  return (
    <div className="w-full">
      <div className="hidden text-2xl [&:has(div[data-filename=foo])]:block">
        &nbsp;hi
        <div>
          &nbsp;hi
          <div>
            &nbsp;hi
            <div>
              &nbsp;hi
              <div>
                &nbsp;hi
                <div>
                  <div>
                    <div>
                      <div>
                        &nbsp;hi
                        <div className="hidden" data-filename="foo">
                          &nbsp;hi
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>&nbsp;</div>
      </div>
      <div className="[&:has(p)]:bg-red-500">
        <p>&nbsp;</p>
      </div>
    </div>
  )
}
